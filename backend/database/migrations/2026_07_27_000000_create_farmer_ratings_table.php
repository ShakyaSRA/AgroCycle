<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('farmer_ratings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('farmer_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('buyer_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->unsignedTinyInteger('rating');
            $table->text('comment')->nullable();

            $table->timestamps();

            $table->unique(['farmer_id', 'buyer_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('farmer_ratings');
    }
};
