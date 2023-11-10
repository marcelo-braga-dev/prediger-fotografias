<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Clientes\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    if (auth()->check()) return redirect()->route('admin.galerias.index');

    return redirect()->route('home');
});

require __DIR__ . '/clientes/home.php';
require __DIR__ . '/auth/index.php';
require __DIR__ . '/auth.php';

Route::get('/dashboard', function () {
    return redirect('/');
});



