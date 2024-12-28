<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\ProductController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'userProfile']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'name' => $request->user()->name,
        'lastname' => $request->user()->lastname,
        'email' => $request->user()->email,
        'is_admin' => $request->user()->is_admin,
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{product}', [ProductController::class, 'show']);
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{product}', [ProductController::class, 'update']); 
    Route::delete('products/{product}', [ProductController::class, 'destroy']); 
});
