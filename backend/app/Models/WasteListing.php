<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteListing extends Model
{
    protected $fillable = [
        'farmer_id',
        'category_id',
        'quantity',
        'unit',
        'price',
        'location',
        'description',
        'status',
        'rejection_reason',
    ];

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ListingImage::class, 'listing_id');
    }

    public function buyerRequests()
    {
        return $this->hasMany(BuyerRequest::class, 'listing_id');
    }
}
