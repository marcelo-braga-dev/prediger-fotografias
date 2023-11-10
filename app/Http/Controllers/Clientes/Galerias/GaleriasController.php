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
    public function index($hash)
    {

        print_pre($hash);
    }

    public function show($hash, Request $request)
    {
        $galeria = (new Galerias())->getPeloToken($hash);
        $pastas = (new GaleriasPastas())->pastas($request->id_pasta, $galeria['id']);
        $arquivos = (new GaleriasArquivos())->galeria($galeria['id'], $request->id_pasta);
//        print_pre($arquivos);

        return Inertia::render('Cliente/Galerias/Show',
            compact('galeria', 'arquivos', 'pastas'));

    }
}
