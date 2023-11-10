<?php

use App\Http\Controllers\Admin\Eventos\EventosController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('eventos', EventosController::class);
    });
