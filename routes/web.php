<?php

use App\Http\Controllers\Auth\RequestAccountUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::get('/account-request', [RequestAccountUserController::class, 'approveAccountPage'])->name('account-request');
Route::post('/account-request/{id}', [RequestAccountUserController::class, 'approveAccount'])->name('account-request.approve');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
