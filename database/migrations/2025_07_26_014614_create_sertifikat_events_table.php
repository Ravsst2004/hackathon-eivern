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
        Schema::create('sertifikat_events', function (Blueprint $table) {
            $table->id();
            $table->string('kegiatan', 255);
            $table->string('nama_peserta', 255);
            $table->string('tingkat', 255);
            $table->string('partisipasi', 255);
            $table->integer('skkm');
            $table->boolean('paraf_bem')->default(false);
            $table->boolean('paraf_kemahasiswaan')->default(false);
            $table->string('photo_sertifikat', 255)->nullable();
            $table->char('id_uniq_sertif', 255)->nullable();
            $table->char('id_user', 16)->nullable();
            $table->unsignedBigInteger('id_event');
            $table->timestamps();

            $table->foreign('id_user')->references('nim')->on('users')->onDelete('set null');
            $table->foreign('id_event')->references('id')->on('events')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sertifikat_events');
    }
};
