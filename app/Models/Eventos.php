<?php

namespace App\Models;

use App\Services\Files\UploadFilesService;
use App\Services\Files\UploadImagensManipular;
use App\src\Galerias\Status\GaleriasStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Eventos extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'status',
        'descricao',
        'cidade',
        'estado',
        'logo',
        'token'
    ];

    public function get($publicos = false)
    {
        $qtdGaleria = (new Galerias())->qtdEvento();

        return $this->newQuery()
            ->where($publicos ? ['status' => (new GaleriasStatus())->publica()] : null)
            ->get()
            ->transform(function ($item) use ($qtdGaleria) {
                return $this->dados($item, $qtdGaleria);
            });
    }

    public function create($dados)
    {
        $url = (new UploadImagensManipular())->originalComprimida($dados->logo, 'eventos/logos');

        $this->newQuery()
            ->create([
                'nome' => $dados->nome,
                'status' => $dados->status,
                'descricao' => $dados->descricao,
                'cidade' => $dados->cidade,
                'estado' => $dados->estado,
                'logo' => $url,
                'token' => Str::random()
            ]);
    }

    public function find($id)
    {
        $qtdGaleria = (new Galerias())->qtdEvento();
        $dados = $this->newQuery()
            ->find($id);

        return $this->dados($dados, $qtdGaleria);
    }

    private function dados($item, $qtdGaleria = null): array
    {
        return [
            'id' => $item->id ?? null,
            'nome' => $item->nome ?? null,
            'status' => $item->status ?? null,
            'descricao' => $item->descricao ?? null,
            'cidade' => $item->cidade ?? null,
            'estado' => $item->estado ?? null,
            'galerias_qtd' => $qtdGaleria[$item->id] ?? 0,
            'localidade' => ($item->cidade ?? null) . '/' . ($item->estado ?? null),
            'logo' => asset('storage/' . $item->logo),
            'token' => $item->token
        ];
    }

    public function getNomes()
    {
        $dados = $this->newQuery()
            ->get();

        $res = [];
        foreach ($dados as $item) {
            $res[$item->id] = $this->dados($item);
        }
        return $res;
    }

    public function getPeloToken($hash)
    {
        $qtdGaleria = (new Galerias())->qtdEvento(true);

        $dados = $this->newQuery()
            ->where('token', $hash)
            ->firstOrFail();

        return $this->dados($dados, $qtdGaleria);
    }

    public function alterarStatus($id, $status)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => $status]);
    }

    public function remove($id)
    {
        $galerias = (new Galerias())->evento($id);

        if (count($galerias)) throw new \DomainException('Exclua antes as galerias deste evento!');

        $this->newQuery()
            ->find($id)
            ->delete();
    }
}
