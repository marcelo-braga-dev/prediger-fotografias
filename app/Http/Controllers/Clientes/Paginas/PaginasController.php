<?php

namespace App\Http\Controllers\Clientes\Paginas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaginasController extends Controller
{
    public function instrucoes()
    {
        return Inertia::render('Cliente/Paginas/Instrucoes');
    }

    public function contato()
    {
        return Inertia::render('Cliente/Paginas/Contato');
    }
}
