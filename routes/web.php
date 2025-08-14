<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HelloController;
use App\Http\Controllers\WeatherController;

Route::get('/', [WeatherController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('hello', [HelloController::class, 'show']);

// Weather routes
Route::get('/weather', [WeatherController::class, 'index'])->name('weather.index');
Route::post('/weather', [WeatherController::class, 'search'])->name('weather.search');
Route::post('/favorites', [WeatherController::class, 'saveFavorite'])->name('favorites.save');
Route::delete('/favorites/{id}', [WeatherController::class, 'removeFavorite'])->name('favorites.remove');
Route::get('/api/combined/{city}', [WeatherController::class, 'apiCombined'])->name('api.combined');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
