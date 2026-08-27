<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, int $postId)
    {
        $user = $request->user();

        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => $user->id,
            'content' => $validated['content'],
        ]);

        return response()->json([
            'comment' => $comment->load('user:id,name,avatar'),
            'message' => 'Comentário publicado!',
        ], 201);
    }

    public function destroy(Request $request, int $id)
    {
        $user = $request->user();
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['message' => 'Não autorizado.'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comentário removido.']);
    }
}
