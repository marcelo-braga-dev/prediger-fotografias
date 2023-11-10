<?php

namespace App\src\Galerias\Status;

use function Termwind\render;

class GaleriasStatus
{
    private string $publica = 'publica';
    private string $privado = 'privado';

    public function publica(): string
    {
        return $this->publica;
    }

    public function publicaNome(): string
    {
        return 'Pública';
    }

    public function privado(): string
    {
        return $this->privado;
    }

    public function privadoNome(): string
    {
        return 'Privado';
    }

    public function status(): array
    {
        return [
            ['status' => $this->publica(), 'nome' => $this->publicaNome()],
            ['status' => $this->privado(), 'nome' => $this->privadoNome()]
        ];
    }

    public function statusNomes(): array
    {
        return [
            $this->publica() => $this->publicaNome(),
            $this->privado() => $this->privadoNome(),
        ];
    }

    public function getStatusNome($status)
    {
        $valores = $this->statusNomes();
        return $valores[$status] ?? '-';
    }
}
