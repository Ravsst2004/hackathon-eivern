<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class JurusanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => $this->faker->unique()->randomElement([
                'Teknik Informatika',
                'Sistem Informasi',
                'Sistem Komputer', 
                'Bisnis Digital',
                'Manajemen Informatika',
            ]),
        ];
    }
}
