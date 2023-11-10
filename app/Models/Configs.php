<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configs extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'valor'
    ];

    public function setEmail($valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['nome' => 'email_contato'], ['valor' => $valor]
            );
    }

    public function setTelefone($valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['nome' => 'telefone_contato'], ['valor' => $valor]
            );
    }

    public function getEmail()
    {
        return $this->newQuery()
            ->where('nome', 'email_contato')
            ->first('valor')->valor ?? null;
    }

    public function getTelefone()
    {
        return $this->newQuery()
            ->where('nome', 'telefone_contato')
            ->first('valor')->valor ?? null;
    }
}
