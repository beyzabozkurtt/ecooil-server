<?php

use App\Models\Address;
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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignIdFor(User::class, 'collector_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignIdFor(Address::class, 'address_id')->constrained('addresses')->onDelete('cascade');
            $table->dateTime('date');
            $table->float("amount");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
