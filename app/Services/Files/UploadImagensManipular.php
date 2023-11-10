<?php

namespace App\Services\Files;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class UploadImagensManipular
{
    public const URL_ORIGINAL = 0;
    public const URL_COMPRIMIDA = 1;
    public const URL_COMPRIMIDA_MARCA = 2;
    public const URL_MINIATURA = 3;
    public const URL_MINIATURA_MARCA = 4;

    public function todos($file, $path): array
    {
        $urls = [];
        $urls[self::URL_ORIGINAL] = $this->original($file, $path);
        $urls[self::URL_COMPRIMIDA] = $this->originalComprimida($file, $path);
        $urls[self::URL_COMPRIMIDA_MARCA] = $this->originalMarcaDagua($file, $path);
        $urls[self::URL_MINIATURA] = $this->miniatura($file, $path);
        $urls[self::URL_MINIATURA_MARCA] = $this->miniaturaMarcaDagua($file, $path);

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
        $largura = $img->getWidth();
        $altura = $img->getHeight();

        $watermark = Image::make(Storage::path('') . 'app/marcadagua.png');
        $marcaAltura = $watermark->getHeight();
        $x = $altura / $marcaAltura * $largura;
        $watermark->resize($x * 0.7, $marcaAltura * 0.7);

        $img->insert($watermark, 'center');
        $img->resize(150, 100);
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
        $img->resize(150, 100);
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
        $largura = $img->getWidth();
        $altura = $img->getHeight();

        $watermark = Image::make(Storage::path('') . 'app/marcadagua.png');
        $marcaAltura = $watermark->getHeight();
        $x = $altura / $marcaAltura * $largura;
        $watermark->resize($x * 0.7, $marcaAltura * 0.7);

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
        $img->save($diretorio . '/' . $nameFile, 50);

        return $dirFile;
    }
}
