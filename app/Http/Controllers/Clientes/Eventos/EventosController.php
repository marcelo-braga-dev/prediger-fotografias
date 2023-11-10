<?php

namespace App\Http\Controllers\Clientes\Eventos;

use App\Http\Controllers\Controller;
use App\Models\Eventos;
use App\Models\Galerias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventosController extends Controller
{
    public function index()
    {
        $eventos = (new Eventos())->get(true);

        return Inertia::render('Cliente/Eventos/Index', compact('eventos'));
    }

    public function show($hash, $id)
    {
        $evento = (new Eventos())->getPeloToken($hash);
        $galerias = (new Galerias())->evento($evento['id'], true);

        return Inertia::render('Cliente/Eventos/Show', compact('evento', 'galerias'));
    }
}
