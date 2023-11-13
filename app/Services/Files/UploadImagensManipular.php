<?php

namespace App\Services\Files;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class UploadImagensManipular
{
    public function todos($file, $path): array
    {
        $urls = [];
        $urls[TipoArquivoService::URL_ORIGINAL] = $this->original($file, $path);
        $urls[TipoArquivoService::URL_COMPRIMIDA] = $this->originalComprimida($file, $path);
        $urls[TipoArquivoService::URL_COMPRIMIDA_MARCA] = $this->originalMarcaDagua($file, $path);
        $urls[TipoArquivoService::URL_MINIATURA] = $this->miniatura($file, $path);
        $urls[TipoArquivoService::URL_MINIATURA_MARCA] = $this->miniaturaMarcaDagua($file, $path);

        return $urls;
    }

    public function original($file, $path = 'arquivos')
    {
        if ($file->isValid()) {
            return $file->store($path);
        }
        return '';
    }

    public function miniaturaMarcaDagua($file, $path = 'arquivos')
    {
        $path = rtrim($path, '/');
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);
        $nameFile = Str::random(40) . '.jpg';
        $dirFile = $path . '/' . $nameFile;

        $img = Image::make($file->getContent());
        $img->widen(250);

        $watermark = Image::make(Storage::path('') . 'app/marcadagua_x150.png');
        $img->insert($watermark, 'center');

        $img->save($diretorio . '/' . $nameFile, 50);

        return $dirFile;
    }

    public function miniatura($file, $path = 'arquivos')
    {
        $path = rtrim($path, '/');
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);

        $nameFile = Str::random(40) . '.jpg';

        $dirFile = $path . '/' . $nameFile;

        $img = Image::make($file->getContent());
        $img->widen(150);
        $img->save($diretorio . '/' . $nameFile, 50);

        return $dirFile;
    }

    public function originalMarcaDagua($file, $path = 'arquivos')
    {
        $path = rtrim($path, '/');
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);

        $nameFile = Str::random(40) . '.jpg';
        $dirFile = $path . '/' . $nameFile;

        $img = Image::make($file->getContent());
        $img->widen(800);

        $watermark = Image::make(Storage::path('') . 'app/marcadagua_x500.png');
        $watermark->widen(300);

        $img->insert($watermark, 'center');
        $img->save($diretorio . '/' . $nameFile, 50);

        return $dirFile;
    }

    public function originalComprimida(mixed $file, $path = 'arquivos')
    {
        $path = rtrim($path, '/');
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);

        $nameFile = Str::random(40) . '.jpg';

        $dirFile = $path . '/' . $nameFile;

        $img = Image::make($file->getContent());
        $img->widen(800);
        $img->save($diretorio . '/' . $nameFile, 50);

        return $dirFile;
    }
}
