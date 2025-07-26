<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['nama' => Roles::SUPER_ADMIN->value]);
        Role::create(['nama' => Roles::KEMAHASISWAAN->value]);
        Role::create(['nama' => Roles::BEM->value]);
        Role::create(['nama' => Roles::ORMAWA->value]);
        Role::create(['nama' => Roles::MAHASISWA->value]);
    }
}
