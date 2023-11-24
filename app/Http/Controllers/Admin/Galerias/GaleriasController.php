<?php

namespace App\Http\Controllers\Admin\Galerias;

use App\Http\Controllers\Controller;
use App\Models\Eventos;
use App\Models\Galerias;
use App\Models\GaleriasArquivos;
use App\Models\GaleriasPastas;
use App\Services\Files\TipoArquivoService;
use App\Services\Files\UploadImagensManipular;
use App\Services\Files\UploadVideosService;
use App\src\Galerias\Status\GaleriasStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GaleriasController extends Controller
{
    public function index()
    {
        $galerias = (new Galerias())->get();

        return Inertia::render('Admin/Galerias/Index', compact('galerias'));
    }

    public function create()
    {
        $eventos = (new Eventos())->getNomes();
        $status = (new GaleriasStatus())->status();

        return Inertia::render('Admin/Galerias/Create',
            compact('eventos', 'status'));
    }

    public function show($id, Request $request)
    {
        $galeria = (new Galerias())->find($id);
        $pastas = (new GaleriasPastas())->pastas($request->id_pasta, $id);

        return Inertia::render('Admin/Galerias/Show',
            compact('galeria', 'pastas'));
    }

    public function store(Request $request)
    {
        (new Galerias())->create($request);

        modalSucesso('Galeria criada com sucesso!');
        return redirect()->route('admin.galerias.index');
    }

    public function edit($id)
    {
        $galeria = (new Galerias())->find($id);
        $eventos = (new Eventos())->getNomes();

        return Inertia::render('Admin/Galerias/Edit',
            compact('galeria', 'eventos'));
    }

    public function update($id, Request $request)
    {
        (new Galerias())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->route('admin.galerias.show', $id);
    }

    public function upload($id, Request $request)
    {
        $arquivo = $request->arquivo;
        $nomeArquivo = (explode('.', $arquivo->getClientOriginalName()))[0];

        $classTipoArquivo = (new TipoArquivoService());
        $tipoArquivo = $classTipoArquivo->verificarMime($arquivo->getClientMimeType());

        if ($tipoArquivo == $classTipoArquivo->getImagem()) {
            $urls = (new UploadImagensManipular())->todos($arquivo, "galerias/$id");

            (new GaleriasArquivos())->create(
                $id, $request['id_pasta'], $urls, $classTipoArquivo->getImagem(), $nomeArquivo
            );
        }

        if ($tipoArquivo == $classTipoArquivo->getVideo()) {

            $urls = (new UploadVideosService())->todos($arquivo, "galerias/$id");

            (new GaleriasArquivos())->create(
                $id, $request['id_pasta'], $urls, $classTipoArquivo->getVideo(), $nomeArquivo
            );
        }

        modalSucesso('Arquivos armazenados com sucesso!');
    }

    public function destroy($id)
    {
        (new Galerias())->remove($id);

        modalSucesso('Galeria Deletada com sucesso!');
        return redirect()->route('admin.galerias.index');
    }

    public function alterarStatus($id, Request $request)
    {
        $status = $request->status ? (new GaleriasStatus())->publica() : (new GaleriasStatus())->privado();

        (new Galerias())->alterarStatus($id, $status);
    }

    public function getArquivos($id, $idPasta)
    {
        return (new GaleriasArquivos())->galeria($id, $idPasta);

    }
}
