<?php

use App\Http\Controllers\Admin\Config\ConfigController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('config', ConfigController::class);
    });
