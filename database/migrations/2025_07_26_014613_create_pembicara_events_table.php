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
        Schema::create('pembicara_events', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 255);
            $table->string('deskripsi', 255);
            $table->string('photo', 255);
            $table->unsignedBigInteger('id_events');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('id_events')->references('id')->on('events')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembicara_events');
    }
};
