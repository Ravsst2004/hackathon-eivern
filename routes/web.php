<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrmawaController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\UtilityController;
use App\Http\Controllers\EventDetailController;
use App\Http\Controllers\Auth\RequestAccountUserController;
use App\Http\Controllers\Sertifikat\SertifikatController;

// Route::get('/', function () {
//     return Inertia::render('LandingPage/index'); // Atau cukup 'LandingPage' jika itu berfungsi
// })->name('landing');

Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::get('/event/{id}', [EventDetailController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('ormawa', OrmawaController::class);

Route::get('/utilities/{id}/edit', [UtilityController::class, 'edit'])->name('utilities.edit');
Route::put('/utilities/{id}', [UtilityController::class, 'update'])->name('utilities.update');

Route::get('/request-paraf', [SertifikatController::class, 'indexParaf'])->name('sertifikat.index');
Route::patch('/approve-paraf', [SertifikatController::class, 'approveParaf'])->name('sertifikat.approve');

Route::post('/import-excel', [SertifikatController::class, 'importExcel'])->name('ormawa.import-excel');
Route::put('/generate-uniq-id', [SertifikatController::class, 'uniqIdGenerate'])->name('ormawa.generate-uniq-id');
Route::get('/export-sertifikat/{eventId}', [SertifikatController::class, 'exportToexcel'])->name('sertifikat.export');


Route::patch('/paraf-request', [RequestAccountUserController::class, 'requestParafBem'])->name('paraf.request');

Route::get('/account-request', [RequestAccountUserController::class, 'approveAccountPage'])->name('account-request');
Route::post('/account-request/{id}', [RequestAccountUserController::class, 'approveAccount'])->name('account-request.approve');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
