<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount(['posts' => function ($q) {
            $q->where('status', 'published');
        }])->get();

        return response()->json($categories);
    }

    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)
            ->withCount(['posts' => function ($q) {
                $q->where('status', 'published');
            }])
            ->firstOrFail();

        return response()->json($category);
    }
}
