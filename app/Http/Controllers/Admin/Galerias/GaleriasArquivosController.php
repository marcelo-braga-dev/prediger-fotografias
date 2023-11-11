<?php

namespace App\Http\Controllers\Admin\Galerias;

use App\Http\Controllers\Controller;
use App\Models\GaleriasArquivos;
use Illuminate\Http\Request;

class GaleriasArquivosController extends Controller
{
    public function destroy($id)
    {
        (new GaleriasArquivos())->remove($id);

        modalSucesso('Arquivo deleteda com sucesso!');
        return redirect()->back();
    }
}
