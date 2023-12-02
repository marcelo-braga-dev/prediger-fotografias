<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('galerias_arquivos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('galerias_id');
            $table->bigInteger('pasta');
            $table->string('nome');
            $table->string('url_original');
            $table->string('url_capa')->nullable();
            $table->string('url_comprimida')->nullable();
            $table->string('url_comprimida_marca')->nullable();
            $table->string('url_miniatura')->nullable();
            $table->string('url_miniatura_marca')->nullable();
            $table->string('tipo', 32);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galerias_arquivos');
    }
};
