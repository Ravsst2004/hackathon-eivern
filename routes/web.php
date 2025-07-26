<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrmawaController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\EventDetailController;
use App\Http\Controllers\Auth\RequestAccountUserController;
use App\Http\Controllers\Sertifikat\SertifikatController;

// Route::get('/', function () {
//     return Inertia::render('LandingPage/index'); // Atau cukup 'LandingPage' jika itu berfungsi
// })->name('landing');

Route::get('/', [LandingController::class, 'index'])->name('landing');

// Route::get('/event/{id}', [EventDetailController::class, 'show']);

Route::get('/all-events', function () {
    return Inertia::render('Events/AllEvents'); // Atau cukup 'LandingPage' jika itu berfungsi
})->name('all-events');

Route::middleware(['auth', 'verified', 'isBem', 'isOrmawa', 'isKemahasiswaan', 'isSuperAdmin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::get('/event/{id}', [EventDetailController::class, 'show'])->name('events.show');
Route::resource('ormawa', OrmawaController::class);


Route::get('/account-request', [RequestAccountUserController::class, 'approveAccountPage'])->name('account-request');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
