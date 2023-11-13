<?php

use App\Http\Controllers\Admin\Galerias\GaleriasArquivosController;
use App\Http\Controllers\Admin\Galerias\GaleriasController;
use App\Http\Controllers\Admin\Galerias\GaleriasPastasController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('galerias', GaleriasController::class);
        Route::resource('galerias-pastas', GaleriasPastasController::class);
        Route::resource('galerias-arquivos', GaleriasArquivosController::class);

        Route::post('galeria/upload/{id}', [GaleriasController::class, 'upload'])
            ->name('galerias.upload');

        Route::put('galeria/alterar-status/{id}', [GaleriasController::class, 'alterarStatus'])
            ->name('galerias.alterar-status');
    });
