<?php

namespace App\Http\Controllers\Admin\Eventos;

use App\Http\Controllers\Controller;
use App\Models\Eventos;
use App\Models\Galerias;
use App\src\Galerias\Status\GaleriasStatus;
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
        $status = (new GaleriasStatus())->status();

        return Inertia::render('Admin/Eventos/Create', compact('status'));
    }

    public function store(Request $request)
    {
        (new Eventos())->create($request);

        modalSucesso('Evento criado com sucesso"');
        return redirect()->route('admin.eventos.index');
    }

    public function destroy($id)
    {
        try {
            (new Eventos())->remove($id);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso('Evento Deletado com sucesso!');
        return redirect()->route('admin.eventos.index');
    }

    public function alterarStatus($id, Request $request)
    {
        $status = $request->status ? (new GaleriasStatus())->publica() : (new GaleriasStatus())->privado();

        (new Eventos())->alterarStatus($id, $status);

        modalSucesso('Status Alterado com Sucesso!');
        return redirect()->back();
    }
}
