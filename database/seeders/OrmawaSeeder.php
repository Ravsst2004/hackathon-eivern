<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\Ormawa;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrmawaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $roleIdBem = Role::where('nama', Roles::BEM->value)->first()?->id;
        $roleIdOrmawa = Role::where('nama', Roles::ORMAWA->value)->inRandomOrder()->first()?->id;
        $ormawa = [
            [
                'nama' => 'BEM Universitas',
                'logo' => 'bem-universitas.png',
                'deskripsi' => 'Badan Eksekutif Mahasiswa tingkat universitas',
                'user_id' => User::where('id_role', $roleIdBem)->first()?->nim,
            ],
            [
                'nama' => 'Himpunan Mahasiswa Teknik Informatika',
                'logo' => 'hmti.png',
                'deskripsi' => 'Himpunan mahasiswa jurusan Teknik Informatika',
                'user_id' => User::where('id_role',$roleIdOrmawa)->inRandomOrder()->first()->nim,
            ],
            [
                'nama' => 'Himpunan Mahasiswa Sistem Informasi',
                'logo' => 'hmsi.png',
                'deskripsi' => 'Himpunan mahasiswa jurusan Sistem Informasi',
                'user_id' =>  User::where('id_role', $roleIdOrmawa)->inRandomOrder()->first()->nim,
            ],
            [
                'nama' => 'UKM Olahraga',
                'logo' => 'ukm-olahraga.png',
                'deskripsi' => 'Unit Kegiatan Mahasiswa bidang olahraga',
                'user_id' => User::where('id_role', $roleIdOrmawa)->inRandomOrder()->first()->nim,
            ],
            [
                'nama' => 'UKM Seni',
                'logo' => 'ukm-seni.png',
                'deskripsi' => 'Unit Kegiatan Mahasiswa bidang seni',
                'user_id' => User::where('id_role', $roleIdOrmawa)->inRandomOrder()->first()->nim,
            ],
        ];
        Ormawa::insert($ormawa);
    }
}
