<?php

namespace Database\Factories;

use App\Models\Jurusan;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jurusanId = Jurusan::inRandomOrder()->first()->id ?? 1;
        $jurusanCode = str_pad($jurusanId, 2, '0', STR_PAD_LEFT);
        $tahunMasuk = $this->faker->numberBetween(2018, 2023);
        $urutan = $this->faker->unique()->numberBetween(1, 999);
        $urutanPadded = str_pad($urutan, 3, '0', STR_PAD_LEFT);
        
        $nim = $tahunMasuk . $jurusanCode . $urutanPadded;
        
        return [
            'nim' => $nim,
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'), // password
            'id_jurusan' => $jurusanId,
            'id_role' => function () {
                return Role::inRandomOrder()->first()->id ?? 1;
            },
        ];
    }

    public function superAdmin()
        {
            return $this->state(function (array $attributes) {
                return [
                    'nim' => '0000000000000001',
                    'id_role' => 1, // SUPER_ADMIN
                ];
            });
        }

        public function bem()
        {
            return $this->state(function (array $attributes) {
                return [
                    'id_role' => 2, // BEM
                ];
            });
        }

        public function kemahasiswaan()
        {
            return $this->state(function (array $attributes) {
                return [
                    'id_role' => 3, // KEMAHASISWAAN
                ];
            });
        }

        public function ormawa()
        {
            return $this->state(function (array $attributes) {
                return [
                    'id_role' => 4, // ORMAWA
                ];
            });
        }

        public function mahasiswa()
        {
            return $this->state(function (array $attributes) {
                return [
                    'id_role' => 5, // MAHASISWA
                ];
            });
        }
}
