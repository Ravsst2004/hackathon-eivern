<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\Jurusan;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            'password' =>  bcrypt('password'), 
            'id_jurusan' => 1,
            'id_role' =>  Role::where('nama', Roles::SUPER_ADMIN->value)->first()->id,
        ]);

        // BEM
        User::create([
            'nim' => '000001001',
            'name' => 'Ketua BEM',
            'email' => 'bem@example.com',
            'password' => bcrypt('password'),
            'id_jurusan' => 1,
            'id_role' =>  Role::where('nama', Roles::BEM->value)->first()->id,
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

        // ORMAWA (10 contoh)
        for ($i = 10; $i <= 20; $i++) {
            User::create([
                'nim' => '0000' . str_pad($i, 2, '0', STR_PAD_LEFT) . '001',
                'name' => 'Pengurus ORMAWA ' . $i,
                'email' => 'ormawa' . $i . '@example.com',
                'password' => bcrypt('password'),
                'id_jurusan' => Jurusan::inRandomOrder()->first()->id ?? 3,
                'id_role' => Role::where('nama', Roles::ORMAWA->value)->first()->id,
            ]);
        }

        // Mahasiswa (20 contoh)
        for ($i = 20; $i <= 30; $i++) {
            User::create([
                'nim' => '2021' . str_pad($i % 10 + 1, 2, '0', STR_PAD_LEFT) . str_pad($i, 3, '0', STR_PAD_LEFT),
                'name' => 'Mahasiswa ' . $i,
                'email' => 'mahasiswa' . $i . '@example.com',
                'password' =>  bcrypt('password'),
                'id_jurusan' => Jurusan::inRandomOrder()->first()->id,
                'id_role' => Role::where('nama', Roles::MAHASISWA->value)->first()->id,
            ]);
        }
    }
}
