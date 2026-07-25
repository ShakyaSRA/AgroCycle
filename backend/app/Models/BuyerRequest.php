<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BuyerRequest extends Model
{
    protected $fillable = [
        'listing_id',
        'buyer_id',
        'message',
        'status',
        'payment_method',
        'payment_status',
        'card_last_four',
        'paid_at',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
    ];

    public function listing()
    {
        return $this->belongsTo(WasteListing::class, 'listing_id');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
}
