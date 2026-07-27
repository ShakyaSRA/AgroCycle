<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FarmerRating extends Model
{
    protected $fillable = [
        'farmer_id',
        'buyer_id',
        'rating',
        'comment',
    ];

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
}
