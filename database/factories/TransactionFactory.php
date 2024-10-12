<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'amount' => fake()->randomFloat(2, 1, 1000),
            'user_id' => fake()->numberBetween(1, 10),
            'address_id' => fake()->numberBetween(1, 10),
            'appointment_id' => fake()->numberBetween(1, 10),
            'points' => fake()->numberBetween(1, 100),
        ];
    }
}
