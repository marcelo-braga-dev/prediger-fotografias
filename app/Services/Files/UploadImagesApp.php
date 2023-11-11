<?php

namespace App\Services\Files;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UploadImagesApp
{
    public function logo($file)
    {
        $path = 'app';
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);

        $img = Image::make($file->getContent());

        $nameFile = 'logo.png';
        $dirFile = $path . '/' . $nameFile;

        $img->save($diretorio . '/' . $nameFile, 80);

        return $dirFile;
    }

    public function logoCliente($file)
    {
        $path = 'app';
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);

        $img = Image::make($file->getContent());

        $nameFile = 'logo_cliente.png';
        $dirFile = $path . '/' . $nameFile;

        $img->save($diretorio . '/' . $nameFile, 80);

        return $dirFile;
    }

    public function marca($file)
    {
        $path = 'app';
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);

        $img = Image::make($file->getContent());
        $img->opacity(50);

        $nameFile = 'marcadagua.png';
        $dirFile = $path . '/' . $nameFile;

        $img->save($diretorio . '/' . $nameFile, 70);

        return $dirFile;
    }
}
