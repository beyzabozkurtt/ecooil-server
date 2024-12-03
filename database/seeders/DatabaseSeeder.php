<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Appointment;
use App\Models\Transaction;
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
        User::factory()->create([
            'username' => 'Test User 1',
            'name' => 'Test User',
            'surname' => 'Test User Surname',
            'email' => 'test@example.com',
            'phone' => '12345678901',
        ]);

        Address::factory()->create([
            'address_name' => 'Test Address 1',
            'address_line_1' => 'Test Address Line 1',
            'user_id' => 1,
            'latitude' => 0.0,
            'longitude' => 0.0,
        ]);

        User::factory(10)->create();
        Address::factory(10)->create();
        Appointment::factory(10)->create();
        Transaction::factory(10)->create();

    }
}
