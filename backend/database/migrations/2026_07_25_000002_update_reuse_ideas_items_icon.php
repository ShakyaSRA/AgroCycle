<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('reuse_ideas', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->json('items')->nullable()->after('title');
            $table->string('icon')->nullable()->after('items');
        });
    }

    public function down(): void
    {
        Schema::table('reuse_ideas', function (Blueprint $table) {
            $table->dropColumn(['items', 'icon']);
            $table->text('description')->nullable();
        });
    }
};
