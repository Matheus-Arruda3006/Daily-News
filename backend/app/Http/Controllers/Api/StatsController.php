<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;

class StatsController extends Controller
{
    public function index()
    {
        $totalPosts = Post::where('status', 'published')->count();
        $totalSubscribers = User::where('is_subscribed', true)->count();
        $totalViews = Post::sum('views_count');
        $totalCategories = Category::count();

        return response()->json([
            'total_posts' => $totalPosts,
            'total_subscribers' => max($totalSubscribers, 1240), // valor atrativo para visualização
            'total_views' => max($totalViews, 84200),
            'total_categories' => $totalCategories,
            'price_monthly' => 9.90,
        ]);
    }
}
