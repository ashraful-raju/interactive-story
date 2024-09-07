<?php

use App\Http\Controllers\Web\StoryController;
use Illuminate\Support\Facades\Route;

Route::name('story.')->group(function () {
    Route::get('/', [StoryController::class, 'index'])->name('index');
    Route::get('/{story:slug}', [StoryController::class, 'show'])->name('show');
    Route::get('/{story:slug}/{item}', [StoryController::class, 'browse'])
        ->name('chapter');
});
