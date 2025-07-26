<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrmawaController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\EventDetailController;
use App\Http\Controllers\Auth\RequestAccountUserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\Sertifikat\SertifikatController;

// Route::get('/', function () {
//     return Inertia::render('LandingPage/index'); // Atau cukup 'LandingPage' jika itu berfungsi
// })->name('landing');

Route::get('/', [LandingController::class, 'index'])->name('landing');
Route::get('/event/{id}', [EventDetailController::class, 'detail'])->name('events.show');


Route::get('/all-events', function () {
    return Inertia::render('Events/AllEvents'); // Atau cukup 'LandingPage' jika itu berfungsi
})->name('all-events');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('profile', [InfoController::class, 'index'])->name('profile.edit');


    Route::resource('ormawa', OrmawaController::class);


    Route::middleware([])->group(function () {
        Route::get('/request-paraf', [SertifikatController::class, 'indexParaf'])->name('sertifikat.index');
        Route::patch('/approve-paraf', [SertifikatController::class, 'approveParaf'])->name('sertifikat.approve');
        Route::put('/generate-uniq-id', [SertifikatController::class, 'uniqIdGenerate'])
            ->name('ormawa.generate-uniq-id');
        Route::post('/account-request/{id}', [RequestAccountUserController::class, 'approveAccount'])->name('account-request.approve');
        Route::resource('events', EventController::class);
        Route::get('/request-uniq-id', [SertifikatController::class, 'requestUniqIdIndex'])->name('sertifikat.request');
    });

    Route::middleware(['isOrmawa'])->group(function () {
        Route::post('/import-excel', [SertifikatController::class, 'importExcel'])->name('ormawa.import-excel');
        Route::get('/export-sertifikat/{eventId}', [SertifikatController::class, 'exportToexcel'])->name('sertifikat.export');
    });
});



Route::patch('/paraf-request', [RequestAccountUserController::class, 'requestParafBem'])->name('paraf.request')->middleware('isMahasiswa');
Route::get('/account-request', [RequestAccountUserController::class, 'approveAccountPage'])->name('account-request');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
