<?php

namespace App\Services\Files;

class TipoArquivoService
{
    private string $imagem = 'imagem';
    private string $video = 'video';
    private string $desconhecido = 'desconhec';

    public function verificarMime($mime): string
    {
        if (str_contains($mime, 'image')) return $this->imagem;
        if (str_contains($mime, 'video')) return $this->video;
        return $this->desconhecido;
    }

    public function getImagem(): string
    {
        return $this->imagem;
    }

    public function getVideo(): string
    {
        return $this->video;
    }
}
