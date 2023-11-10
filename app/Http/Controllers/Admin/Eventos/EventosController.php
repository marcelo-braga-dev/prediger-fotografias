<?php

namespace App\Http\Controllers\Admin\Eventos;

use App\Http\Controllers\Controller;
use App\Models\Eventos;
use App\Models\Galerias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventosController extends Controller
{
    public function index()
    {
        $eventos = (new Eventos())->get();

        return Inertia::render('Admin/Eventos/Index', compact('eventos'));
    }

    public function show($id)
    {
        $evento = (new Eventos())->find($id);
        $galerias = (new Galerias())->evento($id);

        return Inertia::render('Admin/Eventos/Show',
            compact('evento', 'galerias'));
    }

    public function create()
    {
        return Inertia::render('Admin/Eventos/Create');
    }

    public function store(Request $request)
    {
        (new Eventos())->create($request);

        modalSucesso('Evento criado com sucesso"');
        return redirect()->route('admin.eventos.index');
    }
}
