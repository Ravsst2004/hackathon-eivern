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
            // Event 1 - 2 speakers
            [
                'nama' => 'Dr. Ahmad Santoso, M.Kom.',
                'deskripsi' => 'Dosen dan praktisi IT',
                'photo' => 'ahmad-santoso.jpg',
                'id_events' => 1,
            ],
            [
                'nama' => 'Ir. Bambang Wijaya, MBA',
                'deskripsi' => 'Pengusaha sukses bidang teknologi',
                'photo' => 'bambang-wijaya.jpg',
                'id_events' => 1,
            ],
            
            // Event 2 - 1 speaker
            [
                'nama' => 'Prof. Dr. Ani Wijayanti',
                'deskripsi' => 'Guru Besar Ilmu Komunikasi',
                'photo' => 'ani-wijayanti.jpg',
                'id_events' => 2,
            ],
            
            // Event 3 - 2 speakers
            [
                'nama' => 'Drs. Joko Prasetyo, M.Pd.',
                'deskripsi' => 'Pakar pendidikan karakter',
                'photo' => 'joko-prasetyo.jpg',
                'id_events' => 3,
            ],
            [
                'nama' => 'Maria Ulfa, S.Psi., M.Psi.',
                'deskripsi' => 'Psikolog dan motivator',
                'photo' => 'maria-ulfa.jpg',
                'id_events' => 3,
            ],
            
            // Event 4 - 1 speaker
            [
                'nama' => 'Budi Setiawan, S.Kom.',
                'deskripsi' => 'Web Developer profesional',
                'photo' => 'budi-setiawan.jpg',
                'id_events' => 4,
            ],
            
            // Event 5 - 2 speakers
            [
                'nama' => 'Rudi Hermawan, M.Kom.',
                'deskripsi' => 'CTO Tech Startup',
                'photo' => 'rudi-hermawan.jpg',
                'id_events' => 5,
            ],
            [
                'nama' => 'Siti Rahayu, S.T., M.Sc.',
                'deskripsi' => 'AI Researcher',
                'photo' => 'siti-rahayu.jpg',
                'id_events' => 5,
            ],
            
            // Event 6 - 1 speaker
            [
                'nama' => 'Dian Pratama, M.Ds.',
                'deskripsi' => 'Desainer grafis profesional',
                'photo' => 'dian-pratama.jpg',
                'id_events' => 6,
            ],
        ];

        PembicaraEvent::insert($pembicara);
    }
}
