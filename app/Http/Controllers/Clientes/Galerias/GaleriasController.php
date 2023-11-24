<?php

namespace App\Http\Controllers\Clientes\Galerias;

use App\Http\Controllers\Controller;
use App\Models\Galerias;
use App\Models\GaleriasArquivos;
use App\Models\GaleriasPastas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GaleriasController extends Controller
{
    public function show($hash, Request $request)
    {
        $galeria = (new Galerias())->getPeloToken($hash);
        $pastas = (new GaleriasPastas())->pastas($request->id_pasta, $galeria['id']);

        return Inertia::render('Cliente/Galerias/Show',
            compact('galeria', 'pastas'));
    }

    public function getArquivos($hash, $idPasta)
    {
        $galeria = (new Galerias())->getPeloToken($hash);

        return (new GaleriasArquivos())->galeria($galeria['id'], $idPasta);
    }
}
