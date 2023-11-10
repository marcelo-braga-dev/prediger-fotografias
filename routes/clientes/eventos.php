<?php

use App\Http\Controllers\Clientes\Eventos\EventosController;
use Illuminate\Support\Facades\Route;

Route::name('clientes.')
    ->prefix('e1ft/{hash}/')
    ->group(function () {
        Route::resource('eventos', EventosController::class);
    });
