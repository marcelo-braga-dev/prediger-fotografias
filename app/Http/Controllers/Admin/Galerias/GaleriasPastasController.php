<?php

namespace App\Http\Controllers\Admin\Galerias;

use App\Http\Controllers\Controller;
use App\Models\GaleriasPastas;
use Illuminate\Http\Request;

class GaleriasPastasController extends Controller
{
    public function store(Request $request)
    {
        (new GaleriasPastas())->create($request);

        redirect()->back();
    }
}
