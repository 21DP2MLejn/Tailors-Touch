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
    Route::put('/profile', [AuthController::class, 'editprofile']);
    Route::delete('/profile', [AuthController::class, 'deleteprofile']);
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
    Route::get('products/{id}', [ProductController::class, 'show']);
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{product}', [ProductController::class, 'update']); 
    Route::delete('products/{product}', [ProductController::class, 'destroy']); 
});

Route::get('/image/{filename}', function ($filename) {
    $path = storage_path('app/public/images/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }
    
    return response()->file($path);
});