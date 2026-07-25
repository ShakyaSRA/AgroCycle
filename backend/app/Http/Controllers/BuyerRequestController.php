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

    public function pay(Request $request, BuyerRequest $buyerRequest)
    {
        $user = $request->user();

        if ($buyerRequest->buyer_id !== $user->id) {
            abort(403);
        }

        if ($buyerRequest->status !== 'Accepted') {
            return response()->json(['message' => 'This request must be accepted before payment.'], 422);
        }

        $data = $request->validate([
            'payment_method' => 'required|in:card,cod',
            'card_number' => 'required_if:payment_method,card|digits_between:13,19',
            'card_name' => 'required_if:payment_method,card|string|max:255',
            'card_expiry' => ['required_if:payment_method,card', 'regex:/^(0[1-9]|1[0-2])\/[0-9]{2}$/'],
            'cvv' => 'required_if:payment_method,card|digits_between:3,4',
        ]);

        if ($data['payment_method'] === 'card') {
            $buyerRequest->update([
                'payment_method' => 'card',
                'payment_status' => 'Paid',
                'card_last_four' => substr($data['card_number'], -4),
                'paid_at' => now(),
            ]);
        } else {
            $buyerRequest->update([
                'payment_method' => 'cod',
            ]);
        }

        return $buyerRequest->fresh(['listing.category', 'buyer']);
    }
}
