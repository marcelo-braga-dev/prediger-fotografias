<?php

namespace App\Http\Controllers\Admin\Galerias;

use App\Http\Controllers\Controller;
use App\Models\Eventos;
use App\Models\Galerias;
use App\Models\GaleriasArquivos;
use App\Models\GaleriasConteudos;
use App\Models\GaleriasPastas;
use App\Services\Files\TipoArquivoService;
use App\Services\Files\UploadFilesService;
use App\Services\Files\UploadImagensManipular;
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
        $arquivos = (new GaleriasArquivos())->galeria($id, $request->id_pasta);

        return Inertia::render('Admin/Galerias/Show',
            compact('galeria', 'arquivos', 'pastas'));
    }

    public function store(Request $request)
    {
        (new Galerias())->create($request);

        modalSucesso('Galeria criada com sucesso!');
        return redirect()->route('admin.galerias.index');
    }

    public function edit($id, Request $request)
    {
        $galeria = (new Galerias())->find($id);
        $pastas = (new GaleriasPastas())->pastas($request->id_pasta);

        return Inertia::render('Admin/Galerias/Edit',
            compact('galeria', 'pastas'));
    }

    public function upload($id, Request $request)
    {
        $classTipoArquivo = (new TipoArquivoService());

        if ($request['arquivos']) {
            foreach ($request['arquivos'] as $file) {
                $tipoArquivo = $classTipoArquivo->verificarMime($file->getClientMimeType());

                if ($tipoArquivo == $classTipoArquivo->getImagem()) {
                    $urls = (new UploadImagensManipular())->todos($file, "galerias/$id");

                    (new GaleriasArquivos())->create($id, $request['id_pasta'], $urls, $classTipoArquivo->getImagem());
                }

                if ($tipoArquivo == $classTipoArquivo->getVideo()) {
                    $urls[UploadImagensManipular::URL_ORIGINAL] = (new UploadImagensManipular())->original($file, "galerias/$id");

                    (new GaleriasArquivos())->create($id, $request['id_pasta'], $urls, $classTipoArquivo->getVideo());
                }
            }
        }

        modalSucesso('Arquivos armazenados com sucesso!');
        return redirect()->route('admin.galerias.show', [$id, 'id_pasta' => $request['id_pasta']]);
    }

    public function alterarStatus($id, Request $request)
    {
        $status = $request->status ? (new GaleriasStatus())->publica() : (new GaleriasStatus())->privado();

        (new Galerias())->alterarStatus($id, $status);
    }
}
