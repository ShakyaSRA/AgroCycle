<?php

namespace App\Http\Controllers;

use App\Models\BuyerRequest;
use App\Models\WasteListing;
use Illuminate\Http\Request;

class BuyerRequestController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $query = BuyerRequest::with(['listing.category', 'buyer:id,name,email,phone']);

        if ($user->role === 'buyer') {
            $query->where('buyer_id', $user->id);
        } elseif ($user->role === 'farmer') {
            $query->whereHas('listing', fn ($q) => $q->where('farmer_id', $user->id));
        }

        return $query->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'listing_id' => 'required|exists:waste_listings,id',
            'message' => 'nullable|string',
        ]);

        $listing = WasteListing::findOrFail($data['listing_id']);

        if ($listing->status !== 'Approved') {
            return response()->json(['message' => 'This listing is not available for requests.'], 422);
        }

        $buyerRequest = BuyerRequest::create([
            'listing_id' => $listing->id,
            'buyer_id' => $request->user()->id,
            'message' => $data['message'] ?? null,
            'status' => 'Pending',
        ]);

        return response()->json($buyerRequest->load('listing.category'), 201);
    }

    public function update(Request $request, BuyerRequest $buyerRequest)
    {
        $user = $request->user();

        if ($buyerRequest->listing->farmer_id !== $user->id) {
            abort(403);
        }

        $data = $request->validate([
            'status' => 'required|in:Accepted,Rejected',
        ]);

        $buyerRequest->update($data);

        if ($data['status'] === 'Accepted') {
            $buyerRequest->listing->update(['status' => 'Sold']);

            BuyerRequest::where('listing_id', $buyerRequest->listing_id)
                ->where('id', '!=', $buyerRequest->id)
                ->where('status', 'Pending')
                ->update(['status' => 'Rejected']);
        }

        return $buyerRequest->fresh(['listing.category', 'buyer']);
    }
}
