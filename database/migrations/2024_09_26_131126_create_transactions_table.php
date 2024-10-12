<?php

use App\Models\Address;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount');
            $table->foreignIdFor(User::class, 'user_id')->constrained()->onDelete('cascade');
            $table->foreignIdFor(Address::class, 'address_id')->constrained()->onDelete('cascade');
            $table->foreignIdFor(Appointment::class, 'appointment_id')->nullable()->constrained()->onDelete('cascade');
            $table->integer('points')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
