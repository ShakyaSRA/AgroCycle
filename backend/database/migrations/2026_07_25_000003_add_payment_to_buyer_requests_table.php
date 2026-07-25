<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('buyer_requests', function (Blueprint $table) {
            $table->enum('payment_method', ['card', 'cod'])->nullable()->after('status');
            $table->enum('payment_status', ['Unpaid', 'Paid'])->default('Unpaid')->after('payment_method');
            $table->string('card_last_four', 4)->nullable()->after('payment_status');
            $table->timestamp('paid_at')->nullable()->after('card_last_four');
        });
    }

    public function down(): void
    {
        Schema::table('buyer_requests', function (Blueprint $table) {
            $table->dropColumn(['payment_method', 'payment_status', 'card_last_four', 'paid_at']);
        });
    }
};
