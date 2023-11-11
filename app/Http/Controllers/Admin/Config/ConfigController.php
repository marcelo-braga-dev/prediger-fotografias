<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\Configs;
use App\Services\Files\UploadFilesService;
use App\Services\Files\UploadImagensManipular;
use App\Services\Files\UploadImagesApp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfigController extends Controller
{
    public function index()
    {
        $dados['email'] = (new Configs())->getEmail();
        $dados['telefone'] = (new Configs())->getTelefone();

        return Inertia::render('Admin/Config/Index', compact('dados'));
    }

    public function store(Request $request)
    {
        if ($request->logo) {
            (new UploadImagesApp())->logo($request->logo);
        }

        if ($request->logo_cliente) {
            (new UploadImagesApp())->logoCliente($request->logo_cliente);
        }

        if ($request->marca) {
            (new UploadImagesApp())->marca($request->marca);
        }

        if ($request->email) {
            (new Configs())->setEmail($request->email);
        }

        if ($request->telefone) {
            (new Configs())->setTelefone($request->telefone);
        }

        modalSucesso('Dados atualizados com sucesso!');
        return redirect()->back();
    }
}
