<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\SubscriptionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Daily News Platform
|--------------------------------------------------------------------------
*/

// Rotas Públicas
Route::get('/stats', [StatsController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/featured', [PostController::class, 'featured']);
Route::get('/posts/{slug}', [PostController::class, 'show']);
Route::post('/posts/{id}/like', [PostController::class, 'like']);

Route::get('/plans', [SubscriptionController::class, 'plans']);
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);

// Autenticação
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/github', [AuthController::class, 'githubLogin']);

// Rotas Protegidas (Requer Token Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // Auth & Perfil
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

    // Assinaturas
    Route::get('/subscriptions/me', [SubscriptionController::class, 'mySubscription']);
    Route::post('/subscriptions/subscribe', [SubscriptionController::class, 'subscribe']);
    Route::post('/subscriptions/cancel', [SubscriptionController::class, 'cancel']);

    // Favoritos
    Route::get('/bookmarks', [PostController::class, 'userBookmarks']);
    Route::post('/posts/{id}/bookmark', [PostController::class, 'toggleBookmark']);

    // Comentários
    Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

    // Criação / Gestão de Posts (Autores / Admin)
    Route::post('/posts', [PostController::class, 'store']);
});
