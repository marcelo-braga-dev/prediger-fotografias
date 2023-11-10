<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('galerias_pastas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('galerias_id');
            $table->bigInteger('superior')->default(0);
            $table->bigInteger('nivel')->default(0);
            $table->string('nome');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galerias_pastas');
    }
};
