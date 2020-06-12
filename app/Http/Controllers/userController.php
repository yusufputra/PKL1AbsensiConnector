<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class userController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid email or password'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    public function getAuthenticatedUser()
    {
        try {

            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }

    public function getAllUser()
    {
        $users = User::get();
        foreach ($users as $key => $user) {
            $user->key = $user->id;
        }
        return response()->json($users);
    }

    public function deleteUser(Request $request)
    {
        $user = User::where('id', $request->id)->first();
        if ($user) {
            $user->delete();

            return response()->json([
                'message' => 'user berhasil dihapus',
            ]);
        } else {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }
    }

    public function getSpecifiedById($id)
    {
        $user = User::where('id', $id)->first();
        if ($user) {
            return response()->json([
                'message' => 'ketemu nih',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }
    }
}
