<?php

use App\Http\Controllers\Clientes\Paginas\PaginasController;
use Illuminate\Support\Facades\Route;

Route::name('clientes.')
    ->prefix('pages')
    ->group(function () {
        Route::get('instrucoes-uso', [PaginasController::class, 'instrucoes'])
            ->name('instrucoes-uso');

        Route::get('contato', [PaginasController::class, 'contato'])
            ->name('contato');
    });
