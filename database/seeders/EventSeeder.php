<?php

namespace Database\Seeders;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            // BEM Universitas - 3 events
            [
                'nama' => 'Seminar Kewirausahaan',
                'logo' => 'seminar-kewirausahaan.jpg',
                'deskripsi' => 'Seminar tentang kewirausahaan untuk mahasiswa',
                'tanggal' => Carbon::now()->addDays(10),
                'ormawa_id' => 1,
            ],
            [
                'nama' => 'Lomba Debat Mahasiswa',
                'logo' => 'debat-mahasiswa.jpg',
                'deskripsi' => 'Lomba debat antar mahasiswa se-universitas',
                'tanggal' => Carbon::now()->addDays(20),
                'ormawa_id' => 1,
            ],
            [
                'nama' => 'Pelatihan Kepemimpinan',
                'logo' => 'pelatihan-kepemimpinan.jpg',
                'deskripsi' => 'Pelatihan softskill kepemimpinan untuk mahasiswa',
                'tanggal' => Carbon::now()->addDays(25),
                'ormawa_id' => 1,
            ],
            
            // HMTI - 2 events
            [
                'nama' => 'Workshop Pemrograman Web',
                'logo' => 'workshop-web.jpg',
                'deskripsi' => 'Workshop pemrograman web dasar untuk pemula',
                'tanggal' => Carbon::now()->addDays(15),
                'ormawa_id' => 2,
            ],
            [
                'nama' => 'Hackathon Campus',
                'logo' => 'hackathon.jpg',
                'deskripsi' => 'Kompetisi pemrograman 24 jam non-stop',
                'tanggal' => Carbon::now()->addDays(30),
                'ormawa_id' => 2,
            ],
            
            // HMSI - 1 event
            [
                'nama' => 'Pelatihan Desain Grafis',
                'logo' => 'pelatihan-desain.jpg',
                'deskripsi' => 'Pelatihan desain grafis menggunakan tools modern',
                'tanggal' => Carbon::now()->addDays(35),
                'ormawa_id' => 3,
            ],
        ];

        Event::insert($events);
    }
}
