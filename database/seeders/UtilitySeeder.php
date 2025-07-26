<?php

namespace Database\Seeders;

use App\Models\Utility;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UtilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Utility::create([
            'max_skkm' => 100,
            'logo' => 'logo-universitas.png',
        ]);
    }
}
