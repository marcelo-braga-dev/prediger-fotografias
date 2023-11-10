<?php

namespace App\Services\Files;

class UploadFilesService
{
    public function armazenar($request, $file, $path = 'images')
    {
        if ($request->hasFile($file)) {
            if ($request->file($file)->isValid()) {
                return $request->$file->store($path);
            }
        }
        return $request->$file;
    }

    public function armazenarMultiplos($file, $path = 'images')
    {
        if ($file->isValid()) {
            return $file->store($path);
        }
        return null;
    }
}
