<?php

use App\Http\Controllers\Admin\Eventos\EventosController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('eventos', EventosController::class);

        Route::put('evento/alterar-status/{id}', [EventosController::class, 'alterarStatus'])
            ->name('eventos.alterar-status');
    });
