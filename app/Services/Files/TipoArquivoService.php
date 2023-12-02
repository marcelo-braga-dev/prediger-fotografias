<?php

namespace App\Services\Files;

class TipoArquivoService
{
    private string $imagem = 'imagem';
    private string $video = 'video';
    private string $desconhecido = 'desconhecido';

    public const URL_ORIGINAL = 0;
    public const URL_COMPRIMIDA = 1;
    public const URL_COMPRIMIDA_MARCA = 2;
    public const URL_MINIATURA = 3;
    public const URL_MINIATURA_MARCA = 4;
    public const URL_CAPA = 5;

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
