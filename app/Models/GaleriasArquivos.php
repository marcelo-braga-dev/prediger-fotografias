<?php

namespace App\Models;

use App\Services\Files\TipoArquivoService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class GaleriasArquivos extends Model
{
    use HasFactory;

    protected $fillable = [
        'galerias_id',
        'pasta',
        'nome',
        'url_original',
        'url_comprimida',
        'url_comprimida_marca',
        'url_miniatura',
        'url_miniatura_marca',
        'tipo',
    ];

    public function create($idGaleria, $pasta, $urls, $tipo, $nome)
    {
        $this->newQuery()
            ->create([
                'galerias_id' => $idGaleria,
                'nome' => $nome,
                'pasta' => $pasta,
                'url_original' => $urls[TipoArquivoService::URL_ORIGINAL],
                'url_comprimida' => $urls[TipoArquivoService::URL_COMPRIMIDA] ?? null,
                'url_comprimida_marca' => $urls[TipoArquivoService::URL_COMPRIMIDA_MARCA] ?? null,
                'url_miniatura' => $urls[TipoArquivoService::URL_MINIATURA] ?? null,
                'url_miniatura_marca' => $urls[TipoArquivoService::URL_MINIATURA_MARCA] ?? null,
                'tipo' => $tipo,
            ]);
    }

    public function galeria($id, $pasta = null)
    {
        $pasta = $pasta ?? (new GaleriasPastas())->getRaiz($id)->id;

        return $this->newQuery()
            ->where('galerias_id', $id)
            ->where('pasta', $pasta)
            ->orderByDesc('id')
            ->paginate(9)
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome ?? '',
                    'url_original' => asset('storage/' . $item->url_original),
                    'url_comprimida' => asset('storage/' . $item->url_comprimida),
                    'url_comprimida_marca' => asset('storage/' . $item->url_comprimida_marca),
                    'url_miniatura' => asset('storage/' . $item->url_miniatura),
                    'url_miniatura_marca' => asset('storage/' . $item->url_miniatura_marca),
                    'tipo' => $item->tipo,
                ];
            });
    }

    public function qtdArquivos()
    {
        $dados = $this->newQuery()
            ->select(DB::raw('COUNT(id) as qtd, galerias_id as galeria'))
            ->groupBy('galeria')
            ->get();

        $res = [];
        foreach ($dados as $item) {
            $res[$item['galeria']] = $item['qtd'];
        }
        return $res;
    }

    public function qtdArquivosPasta()
    {
        $dados = $this->newQuery()
            ->select(DB::raw('COUNT(id) as qtd, pasta as pasta'))
            ->groupBy('pasta')
            ->get();
        $res = [];
        foreach ($dados as $item) {
            $res[$item['pasta']] = $item['qtd'];
        }

        return $res;
    }

    public function remove($id)
    {
        $this->newQuery()
            ->find($id)
            ->delete();
    }
}
