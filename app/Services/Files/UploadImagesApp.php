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
        $img->opacity(70);

        $img->widen(500);
        $nameFileM = 'marcadagua_x500.png';
        $dirFile = $path . '/' . $nameFileM;

        $img->save($diretorio . '/' . $nameFileM, 90);

        $img->widen(150);
        $nameFileP = 'marcadagua_x150.png';
        $dirFile = $path . '/' . $nameFileP;
        $img->save($diretorio . '/' . $nameFileP, 90);

        return $dirFile;
    }
}
