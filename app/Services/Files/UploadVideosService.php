<?php

namespace App\Services\Files;

use FFMpeg\Coordinate\Dimension;
use FFMpeg\FFMpeg;
use FFMpeg\Format\Video\X264;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadVideosService
{
    private FFMpeg $ffmpeg;

    public function __construct()
    {
        $this->ffmpeg = FFMpeg::create([
            'ffmpeg.binaries' => exec('which ffmpeg'),
            'ffprobe.binaries' => exec('which ffprobe'),
            'timeout' => 3600,
            'ffmpeg.threads' => 12,
        ]);
    }

    public function todos($file, string $path)
    {
        $urls = [];
        $urls[TipoArquivoService::URL_ORIGINAL] = $this->original($file, $path);
        $urls[TipoArquivoService::URL_MINIATURA] = $this->miniatura($file, $path);
        $urls[TipoArquivoService::URL_MINIATURA_MARCA] = $this->miniaturaMarcaDagua($file, $path);
//        $urls[TipoArquivoService::URL_COMPRIMIDA] = $this->originalComprimida($file, $path);
//        $urls[TipoArquivoService::URL_COMPRIMIDA_MARCA] = $this->originalMarcaDagua($file, $path);

        return $urls;
    }

    public function original($file, $path)
    {
        if ($file->isValid()) {
            return $file->store($path);
        }
        return '';
    }

    public function miniatura($file, $path)
    {
        $path = rtrim($path, '/');
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);
        $nameFile = Str::random(40) . '.mp4';
        $dirFile = $path . '/' . $nameFile;

        $video = $this->ffmpeg->open($file);
        $video->filters()
            ->pad(new Dimension(170, 280))
            ->synchronize();

        $video->save(new X264('libmp3lame', 'libx264'), $diretorio . '/' . $nameFile);

        return $dirFile;
    }

    private function miniaturaMarcaDagua($file, $path)
    {
        Storage::makeDirectory($path);
        $diretorio = Storage::path($path);
        $nameFile = Str::random(40) . '.mp4';
        $dirFile = $path . '/' . $nameFile;

        $video = $this->ffmpeg->open($file);
        $video->filters()
            ->pad(new Dimension(170, 280))
            ->watermark(Storage::path('app/marcadagua.png'), [
                'position' => 'relative',
                'bottom' => 90,
                'right' => 5,
            ])
            ->synchronize();

        $video->save(new X264('libmp3lame', 'libx264'), $diretorio . '/' . $nameFile);

        return $dirFile;
    }
}
