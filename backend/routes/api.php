<?php

use App\Http\Controllers\Admin\StatsController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BuyerRequestController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryRequestController;
use App\Http\Controllers\FarmerRatingController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReuseIdeaController;
use App\Http\Controllers\WasteListingController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/waste-listings', [WasteListingController::class, 'index']);
Route::get('/waste-listings/{wasteListing}', [WasteListingController::class, 'show']);
Route::get('/reuse-ideas', [ReuseIdeaController::class, 'index']);
Route::get('/farmers/{farmer}/ratings', [FarmerRatingController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me', [AuthController::class, 'update']);

    Route::get('/my-listings', [WasteListingController::class, 'mine']);
    Route::put('/waste-listings/{wasteListing}', [WasteListingController::class, 'update']);
    Route::delete('/waste-listings/{wasteListing}', [WasteListingController::class, 'destroy']);

    Route::get('/buyer-requests', [BuyerRequestController::class, 'index']);
    Route::patch('/buyer-requests/{buyerRequest}', [BuyerRequestController::class, 'update']);

    Route::get('/category-requests', [CategoryRequestController::class, 'index']);

    Route::get('/conversations', [MessageController::class, 'conversations']);
    Route::get('/messages/{userId}', [MessageController::class, 'show']);
    Route::post('/messages', [MessageController::class, 'store']);

    Route::post('/reuse-ideas', [ReuseIdeaController::class, 'store']);

    Route::middleware('role:farmer')->group(function () {
        Route::post('/waste-listings', [WasteListingController::class, 'store']);
        Route::post('/category-requests', [CategoryRequestController::class, 'store']);
    });

    Route::middleware('role:buyer')->group(function () {
        Route::post('/buyer-requests', [BuyerRequestController::class, 'store']);
        Route::patch('/buyer-requests/{buyerRequest}/pay', [BuyerRequestController::class, 'pay']);
        Route::post('/farmers/{farmer}/ratings', [FarmerRatingController::class, 'store']);
    });

    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/stats', [StatsController::class, 'index']);
        Route::get('/users', [AdminUserController::class, 'index']);
        Route::patch('/users/{user}/toggle-status', [AdminUserController::class, 'toggleStatus']);
        Route::delete('/users/{user}', [AdminUserController::class, 'destroy']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::patch('/category-requests/{categoryRequest}', [CategoryRequestController::class, 'update']);
        Route::get('/reuse-ideas', [ReuseIdeaController::class, 'adminIndex']);
        Route::patch('/reuse-ideas/{reuseIdea}', [ReuseIdeaController::class, 'update']);
    });
});
