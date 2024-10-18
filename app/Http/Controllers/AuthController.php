<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //    login with email or phone number and password

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required_without:phone|string|email',
            'phone' => 'required_without:email|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)
            ->orWhere('phone', $request->phone)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 401);
        }

        return response()->json($user);
    }
}
