<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\Role;
use App\Models\User;
use App\Models\Ormawa;
use App\Models\Jurusan;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Admin
        User::create([
            'nim' => '0000001',
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => bcrypt('password'), 
            'id_jurusan' => 1,
            'id_role' => Role::where('nama', Roles::SUPER_ADMIN->value)->first()->id,
        ]);

        // BEM
        $bemUser = User::create([
            'nim' => '000001001',
            'name' => 'Ketua BEM',
            'email' => 'bem@example.com',
            'password' => bcrypt('password'),
            'id_jurusan' => 1,
            'id_role' => Role::where('nama', Roles::BEM->value)->first()->id,
        ]);

        // Buat Ormawa BEM
        Ormawa::create([
            'nama' => 'BEM Universitas',
            'logo' => 'bem-universitas.png',
            'deskripsi' => 'Badan Eksekutif Mahasiswa tingkat universitas',
            'user_id' => $bemUser->nim,
        ]);

        // Kemahasiswaan
        User::create([
            'nim' => '000002002',
            'name' => 'Staff Kemahasiswaan',
            'email' => 'kemahasiswaan@example.com',
            'password' => bcrypt('password'),
            'id_jurusan' => 2,
            'id_role' => Role::where('nama', Roles::KEMAHASISWAAN->value)->first()->id,
        ]);

        // ORMAWA (4 contoh sesuai brief)
        $ormawas = [
            [
                'nim' => '000010001',
                'name' => 'Ketua HMTI',
                'email' => 'hmti@example.com',
                'ormawa_data' => [
                    'nama' => 'Himpunan Mahasiswa Teknik Informatika',
                    'logo' => 'hmti.png',
                    'deskripsi' => 'Himpunan mahasiswa jurusan Teknik Informatika',
                ]
            ],
            [
                'nim' => '000011001',
                'name' => 'Ketua HMSI',
                'email' => 'hmsi@example.com',
                'ormawa_data' => [
                    'nama' => 'Himpunan Mahasiswa Sistem Informasi',
                    'logo' => 'hmsi.png',
                    'deskripsi' => 'Himpunan mahasiswa jurusan Sistem Informasi',
                ]
            ],
            [
                'nim' => '000012001',
                'name' => 'Ketua UKM Olahraga',
                'email' => 'ukm-olahraga@example.com',
                'ormawa_data' => [
                    'nama' => 'UKM Olahraga',
                    'logo' => 'ukm-olahraga.png',
                    'deskripsi' => 'Unit Kegiatan Mahasiswa bidang olahraga',
                ]
            ],
            [
                'nim' => '000013001',
                'name' => 'Ketua UKM Seni',
                'email' => 'ukm-seni@example.com',
                'ormawa_data' => [
                    'nama' => 'UKM Seni',
                    'logo' => 'ukm-seni.png',
                    'deskripsi' => 'Unit Kegiatan Mahasiswa bidang seni',
                ]
            ]
        ];

        foreach ($ormawas as $ormawa) {
            $user = User::create([
                'nim' => $ormawa['nim'],
                'name' => $ormawa['name'],
                'email' => $ormawa['email'],
                'password' => bcrypt('password'),
                'id_jurusan' => Jurusan::inRandomOrder()->first()->id,
                'id_role' => Role::where('nama', Roles::ORMAWA->value)->first()->id,
            ]);

            Ormawa::create(array_merge($ormawa['ormawa_data'], [
                'user_id' => $user->nim
            ]));
        }

        // Mahasiswa (20 contoh)
        for ($i = 20; $i <= 30; $i++) {
            User::create([
                'nim' => '2021' . str_pad($i % 10 + 1, 2, '0', STR_PAD_LEFT) . str_pad($i, 3, '0', STR_PAD_LEFT),
                'name' => 'Mahasiswa ' . $i,
                'email' => 'mahasiswa' . $i . '@example.com',
                'password' => bcrypt('password'),
                'id_jurusan' => Jurusan::inRandomOrder()->first()->id,
                'id_role' => Role::where('nama', Roles::MAHASISWA->value)->first()->id,
            ]);
        }
    }
}
