<?php

use App\Http\Controllers\Web\HelpdeskController;
use Illuminate\Support\Facades\Route;

Route::prefix('helpdesk')->name('helpdesk.')->group(function () {
    Route::get('/', [HelpdeskController::class, 'index'])->name('index');
    Route::get('/tiket', [HelpdeskController::class, 'tiket'])->name('tiket');
    Route::get('/sla', [HelpdeskController::class, 'sla'])->name('sla');
    Route::get('/knowledge', [HelpdeskController::class, 'knowledge'])->name('knowledge');
    Route::get('/agen', [HelpdeskController::class, 'agen'])->name('agen');
    Route::get('/laporan', [HelpdeskController::class, 'laporan'])->name('laporan');
});
