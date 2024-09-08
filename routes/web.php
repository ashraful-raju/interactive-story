<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\StoryItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('stories', StoryController::class);
    Route::resource('stories.items', StoryItemController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::any('/test', function () {
    // dd(auth()->user());
    $data = \App\Models\Story::with(['author', 'startingItems'])->first();
    return response()->json($data);
});

require __DIR__ . '/auth.php';

require __DIR__ . '/story.php';
