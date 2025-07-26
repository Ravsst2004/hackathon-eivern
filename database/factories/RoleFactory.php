<?php

namespace Database\Factories;

use app\Enums\Roles;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                Roles::SUPER_ADMIN->value,
                Roles::BEM->value,
                Roles::KEMAHASISWAAN->value,
                Roles::ORMAWA->value,
                Roles::MAHASISWA->value
            ]),
        ];
    }
}
