<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        Newsletter::firstOrCreate(
            ['email' => $validated['email']],
            ['status' => 'active']
        );

        return response()->json([
            'message' => 'Obrigado por assinar nossa newsletter semanal!'
        ]);
    }
}
