<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'avatar' => 'https://api.dicebear.com/7.x/bottts/svg?seed=' . urlencode($validated['name']),
            'role' => 'user',
            'is_subscribed' => false,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('activeSubscription'),
            'token' => $token,
            'message' => 'Conta criada com sucesso!'
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('activeSubscription'),
            'token' => $token,
            'message' => 'Login realizado com sucesso!'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load(['activeSubscription', 'bookmarks.post']),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Desconectado com sucesso!'
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'bio' => 'nullable|string|max:500',
            'avatar' => 'nullable|string',
        ]);

        $user->update($validated);

        return response()->json([
            'user' => $user->fresh(['activeSubscription']),
            'message' => 'Perfil atualizado com sucesso!'
        ]);
    }

    /**
     * Mock rápido de login com GitHub para simular o comportamento original do ig.news
     */
    public function githubLogin(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'avatar' => 'nullable|string',
            'github_id' => 'nullable|string',
        ]);

        $user = User::firstOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name,
                'avatar' => $request->avatar ?: 'https://api.dicebear.com/7.x/bottts/svg?seed=' . urlencode($request->name),
                'password' => Hash::make(uniqid('github_')),
                'github_id' => $request->github_id ?: 'gh_' . time(),
                'role' => 'user',
                'is_subscribed' => false,
            ]
        );

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('activeSubscription'),
            'token' => $token,
            'message' => 'Conectado com GitHub!'
        ]);
    }
}
