<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
           RoleSeeder::class,
           JurusanSeeder::class,
           UserSeeder::class,
           UtilitySeeder::class,
           OrmawaSeeder::class,
           EventSeeder::class,
           PembicaraEventSeeder::class
           
        ]);
    }
}
