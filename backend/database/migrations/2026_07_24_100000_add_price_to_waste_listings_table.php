<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('waste_listings', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->nullable()->after('unit');
        });
    }

    public function down(): void
    {
        Schema::table('waste_listings', function (Blueprint $table) {
            $table->dropColumn('price');
        });
    }
};
