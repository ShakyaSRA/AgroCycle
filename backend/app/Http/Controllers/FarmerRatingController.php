<?php

namespace App\Http\Controllers;

use App\Models\FarmerRating;
use App\Models\User;
use Illuminate\Http\Request;

class FarmerRatingController extends Controller
{
    public function index(Request $request, User $farmer)
    {
        if ($farmer->role !== 'farmer') {
            abort(404);
        }

        $ratings = $farmer->ratingsReceived()->with('buyer:id,name')->latest()->get();

        $myRating = null;
        if ($request->user() && $request->user()->role === 'buyer') {
            $myRating = $ratings->firstWhere('buyer_id', $request->user()->id);
        }

        return response()->json([
            'average' => $ratings->isEmpty() ? null : round($ratings->avg('rating'), 1),
            'count' => $ratings->count(),
            'ratings' => $ratings,
            'my_rating' => $myRating,
        ]);
    }

    public function store(Request $request, User $farmer)
    {
        if ($farmer->role !== 'farmer') {
            abort(404);
        }

        if ($farmer->id === $request->user()->id) {
            return response()->json(['message' => 'You cannot rate yourself.'], 422);
        }

        $data = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $rating = FarmerRating::updateOrCreate(
            ['farmer_id' => $farmer->id, 'buyer_id' => $request->user()->id],
            ['rating' => $data['rating'], 'comment' => $data['comment'] ?? null]
        );

        return response()->json($rating->fresh('buyer:id,name'));
    }
}
