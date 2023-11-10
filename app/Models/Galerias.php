<?php

namespace App\Models;

use App\Services\Files\UploadFilesService;
use App\src\Galerias\Status\GaleriasStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Galerias extends Model
{
    use HasFactory;

    private int $tamanho = 0;

    protected $fillable = [
        'titulo',
        'data',
        'eventos_id',
        'senha',
        'token',
        'capa',
        'status',
        'descricao',
    ];

    public function create($dados)
    {
        $url = (new UploadFilesService())->armazenarMultiplos($dados['capa'], "galerias/capas");

        $galeria = $this->newQuery()
            ->create([
                'titulo' => $dados->titulo,
                'data' => $dados->data,
                'eventos_id' => $dados->evento,
                'descricao' => $dados->descricao,
                'capa' => $url,
                'senha' => Str::random(8),
                'token' => Str::random(),
                'status' => $dados->status,
            ]);

        (new GaleriasPastas())->create(['galeria_id' => $galeria->id, 'nome_pasta' => 'raiz']);
    }

    public function get()
    {
        $eventos = (new Eventos())->getNomes();
        $qtdArquivos = (new GaleriasArquivos())->qtdArquivos();

        return $this->newQuery()
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($eventos, $qtdArquivos) {
                return $this->dados($item, $eventos, $qtdArquivos);
            });
    }

    public function find($id)
    {
        $eventos = (new Eventos())->getNomes();

        $dados = $this->newQuery()
            ->find($id);

        return $this->dados($dados, $eventos);
    }

    public function evento($id, $publico = null)
    {
        $eventos = (new Eventos())->getNomes();

        return $this->newQuery()
            ->where('eventos_id', $id)
            ->where($publico ? ['status' => (new GaleriasStatus())->publica()] : null)
            ->get()
            ->transform(function ($item) use ($eventos) {
                return $this->dados($item, $eventos);
            });
    }

    private function dados($item, $evento, $qtdArquivos = []): array
    {
        return [
            'id' => $item->id,
            'titulo' => $item->titulo,
            'data' => convert_data($item->data),
            'descricao' => $item->descricao,
            'status_nome' => (new GaleriasStatus())->getStatusNome($item->status),
            'status' => $item->status,
            'capa' => asset('storage/' . $item->capa),
            'ultima_atualizacao' => date('d/m/y H:i:s', strtotime($item->updated_at)),
            'senha' => $item->senha,
            'token' => $item->token,
            'qtd_arquivos' => $qtdArquivos[$item->id] ?? 0,
            'evento' => [
                'id' => $evento[$item->eventos_id]['id'] ?? '',
                'nome' => $evento[$item->eventos_id]['nome'] ?? '',
                'localidade' => $evento[$item->eventos_id]['localidade'] ?? '',
            ]
        ];
    }

    public function alterarStatus($id, $status)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'status' => $status
            ]);
    }

    public function getPeloToken($hash): array
    {
        $eventos = (new Eventos())->getNomes();
        $qtdArquivos = (new GaleriasArquivos())->qtdArquivos();

        $dados = $this->newQuery()
            ->where('token', $hash)
            ->orderByDesc('id')
            ->firstOrFail();

        return $this->dados($dados, $eventos, $qtdArquivos);
    }

    public function qtdEvento()
    {
        $dados = $this->newQuery()
            ->select(DB::raw('COUNT(id) as qtd, eventos_id as evento'))
            ->groupBy('evento')
            ->get();

        $res = [];
        foreach ($dados as $item) {
            $res[$item->evento] = $item->qtd;
        }
        return $res;
    }
}
