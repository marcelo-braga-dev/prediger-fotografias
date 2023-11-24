<?php

use App\Http\Controllers\Clientes\Galerias\GaleriasController;
use Illuminate\Support\Facades\Route;

Route::name('clientes.')
    ->prefix('5d4a/{hash}/')
    ->group(function () {
        Route::resource('galerias', GaleriasController::class);

        Route::get('galeria/arquivos/{idPasta}', [GaleriasController::class, 'getArquivos'])
            ->name('galerias.arquivos');
    });
