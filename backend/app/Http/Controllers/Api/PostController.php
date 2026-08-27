<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['category', 'user:id,name,avatar', 'tags'])
            ->where('status', 'published');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ilike', "%{$search}%")
                  ->orWhere('summary', 'ilike', "%{$search}%");
            });
        }

        if ($request->filled('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->tag);
            });
        }

        $posts = $query->orderBy('published_at', 'desc')->paginate($request->input('per_page', 9));

        return response()->json($posts);
    }

    public function featured()
    {
        $featured = Post::with(['category', 'user:id,name,avatar'])
            ->where('status', 'published')
            ->orderBy('views_count', 'desc')
            ->take(3)
            ->get();

        return response()->json($featured);
    }

    public function show(Request $request, string $slug)
    {
        $post = Post::with(['category', 'user:id,name,avatar,bio', 'tags', 'comments.user:id,name,avatar'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Incrementar visualização
        $post->increment('views_count');

        $user = $request->user('sanctum');
        $hasAccess = false;

        if (!$post->is_premium) {
            $hasAccess = true;
        } elseif ($user && ($user->is_subscribed || $user->role === 'admin' || $user->id === $post->user_id)) {
            $hasAccess = true;
        }

        $isBookmarked = false;
        if ($user) {
            $isBookmarked = Bookmark::where('user_id', $user->id)->where('post_id', $post->id)->exists();
        }

        return response()->json([
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'summary' => $post->summary,
                'content' => $hasAccess ? $post->content : $post->preview_content,
                'cover_image' => $post->cover_image,
                'read_time' => $post->read_time,
                'is_premium' => $post->is_premium,
                'views_count' => $post->views_count,
                'likes_count' => $post->likes_count,
                'published_at' => $post->published_at,
                'category' => $post->category,
                'user' => $post->user,
                'tags' => $post->tags,
                'comments' => $post->comments,
                'is_locked' => !$hasAccess,
                'is_bookmarked' => $isBookmarked,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'cover_image' => 'nullable|string',
            'read_time' => 'nullable|integer|min:1',
            'is_premium' => 'boolean',
            'tags' => 'nullable|array',
        ]);

        $slug = Str::slug($validated['title']) . '-' . Str::random(5);

        $post = Post::create([
            'user_id' => $user->id,
            'category_id' => $validated['category_id'] ?? null,
            'title' => $validated['title'],
            'slug' => $slug,
            'summary' => $validated['summary'],
            'content' => $validated['content'],
            'cover_image' => $validated['cover_image'] ?? null,
            'read_time' => $validated['read_time'] ?? ceil(str_word_count($validated['content']) / 200),
            'is_premium' => $validated['is_premium'] ?? true,
            'status' => 'published',
            'published_at' => now(),
        ]);

        if (!empty($validated['tags'])) {
            $post->tags()->sync($validated['tags']);
        }

        return response()->json([
            'post' => $post->load(['category', 'tags']),
            'message' => 'Artigo publicado com sucesso!'
        ], 201);
    }

    public function like(Request $request, int $id)
    {
        $post = Post::findOrFail($id);
        $post->increment('likes_count');

        return response()->json([
            'likes_count' => $post->likes_count,
            'message' => 'Artigo curtido!'
        ]);
    }

    public function toggleBookmark(Request $request, int $id)
    {
        $user = $request->user();
        $bookmark = Bookmark::where('user_id', $user->id)->where('post_id', $id)->first();

        if ($bookmark) {
            $bookmark->delete();
            $bookmarked = false;
            $message = 'Artigo removido dos favoritos.';
        } else {
            Bookmark::create([
                'user_id' => $user->id,
                'post_id' => $id,
            ]);
            $bookmarked = true;
            $message = 'Artigo salvo nos favoritos!';
        }

        return response()->json([
            'is_bookmarked' => $bookmarked,
            'message' => $message,
        ]);
    }

    public function userBookmarks(Request $request)
    {
        $user = $request->user();
        $bookmarks = Bookmark::with(['post.category', 'post.user:id,name,avatar'])
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        return response()->json($bookmarks);
    }
}
