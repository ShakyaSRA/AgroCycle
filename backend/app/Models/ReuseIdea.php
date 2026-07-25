<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReuseIdea extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'items',
        'icon',
        'status',
    ];

    protected $casts = [
        'items' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
