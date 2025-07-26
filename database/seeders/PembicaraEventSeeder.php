<?php

namespace Database\Seeders;

use App\Models\PembicaraEvent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PembicaraEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pembicara = [
            [
                'nama' => 'Dr. Ahmad Santoso, M.Kom.',
                'deskripsi' => 'Dosen dan praktisi IT',
                'photo' => 'ahmad-santoso.jpg',
                'id_events' => 1, // Seminar Kewirausahaan
            ],
            [
                'nama' => 'Budi Setiawan, S.Kom.',
                'deskripsi' => 'Web Developer profesional',
                'photo' => 'budi-setiawan.jpg',
                'id_events' => 2, // Workshop Pemrograman Web
            ],
            [
                'nama' => 'Prof. Dr. Ani Wijayanti',
                'deskripsi' => 'Guru Besar Ilmu Komunikasi',
                'photo' => 'ani-wijayanti.jpg',
                'id_events' => 3, // Lomba Debat Mahasiswa
            ],
            [
                'nama' => 'Dian Pratama, M.Ds.',
                'deskripsi' => 'Desainer grafis profesional',
                'photo' => 'dian-pratama.jpg',
                'id_events' => 4, // Pelatihan Desain Grafis
            ],
        ];

        PembicaraEvent::insert($pembicara);
    }
}
