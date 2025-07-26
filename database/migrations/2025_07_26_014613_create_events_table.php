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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 255);
            $table->string('logo', 255);
            $table->text('deskripsi');
            $table->date('tanggal');
            $table->unsignedBigInteger('ormawa_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('ormawa_id')->references('id')->on('ormawas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
