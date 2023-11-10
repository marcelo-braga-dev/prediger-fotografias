<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GaleriasPastas extends Model
{
    use HasFactory;

    protected $fillable = [
        'galerias_id',
        'superior',
        'nivel',
        'nome',
    ];

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'galerias_id' => $dados['galeria_id'],
                'superior' => $dados['id_pasta'] ?? 0,
                'nivel' => $dados['id_pasta'] ?? 0,
                'nome' => $dados['nome_pasta'],
            ]);
    }

    public function pastas($idPasta, $galeria)
    {
        $pastaRaiz = $this->getRaiz($galeria);
        $qtdPastas = (new GaleriasArquivos())->qtdArquivosPasta();

        $pastas = $this->newQuery()
            ->where('superior', $idPasta ?? $pastaRaiz->id)
            ->where('galerias_id', $galeria)
            ->get()
            ->transform(function ($item) use ($qtdPastas) {
                return [
                    'id' => $item->id,
                    'superior' => $item->superior,
                    'nivel' => $item->nivel,
                    'nome' => $item->nome,
                    'qtd' => $qtdPastas[$item->id] ?? 0
                ];
            });

        $superior = $this->newQuery()->find($idPasta);
        if ($superior->superior ?? null) $idSuperior = $superior->superior;
        else $idSuperior = $pastaRaiz->id;

        $nivel = $superior->nivel ?? 0;

        return [
            'atual' => $idPasta ?? $pastaRaiz->id,
            'superior' => $idSuperior,
            'superior_nome' => $superior->nome ?? '',
            'nivel' => $nivel,
            'pastas' => $pastas
        ];
    }

    public function getRaiz($galeria)
    {
        return $this->newQuery()
            ->where('nivel', 0)
            ->where('galerias_id', $galeria)
            ->first();
    }
}
