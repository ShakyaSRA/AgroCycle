<?php

namespace App\Http\Controllers;

use App\Models\WasteListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WasteListingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $query = WasteListing::with(['farmer:id,name,location,phone', 'category', 'images']);

        if ($user && $user->role === 'admin') {
            if ($request->filled('status')) {
                $query->where('status', $request->query('status'));
            }
        } else {
            $query->where('status', 'Approved');
        }

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhereHas('category', fn ($c) => $c->where('name', 'like', "%{$search}%"));
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->query('category_id'));
        }

        return $query->latest()->get();
    }

    public function mine(Request $request)
    {
        return WasteListing::with(['category', 'images', 'buyerRequests'])
            ->where('farmer_id', $request->user()->id)
            ->latest()
            ->get();
    }

    public function show(WasteListing $wasteListing)
    {
        return $wasteListing->load(['farmer:id,name,location,phone', 'category', 'images']);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'quantity' => 'required|numeric|min:0.01',
            'unit' => 'required|string|max:20',
            'price' => 'nullable|numeric|min:0',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'images.*' => 'nullable|image|max:5120',
        ]);

        $listing = WasteListing::create([
            'farmer_id' => $request->user()->id,
            'category_id' => $data['category_id'],
            'quantity' => $data['quantity'],
            'unit' => $data['unit'],
            'price' => $data['price'] ?? null,
            'location' => $data['location'],
            'description' => $data['description'],
            'status' => 'Pending',
        ]);

        foreach ($request->file('images', []) as $image) {
            $path = $image->store('listings', 'public');
            $listing->images()->create(['image_path' => $path]);
        }

        return response()->json($listing->load(['category', 'images']), 201);
    }

    public function update(Request $request, WasteListing $wasteListing)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $data = $request->validate([
                'status' => 'required|in:Pending,Approved,Rejected,Sold',
            ]);

            $wasteListing->update($data);

            return $wasteListing->fresh(['category', 'images', 'farmer:id,name']);
        }

        if ($wasteListing->farmer_id !== $user->id) {
            abort(403);
        }

        $data = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'quantity' => 'sometimes|numeric|min:0.01',
            'unit' => 'sometimes|string|max:20',
            'price' => 'nullable|numeric|min:0',
            'location' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'images.*' => 'nullable|image|max:5120',
        ]);

        $wasteListing->update($data);

        if ($wasteListing->status !== 'Sold') {
            $wasteListing->status = 'Pending';
            $wasteListing->save();
        }

        foreach ($request->file('images', []) as $image) {
            $path = $image->store('listings', 'public');
            $wasteListing->images()->create(['image_path' => $path]);
        }

        return $wasteListing->fresh(['category', 'images']);
    }

    public function destroy(Request $request, WasteListing $wasteListing)
    {
        $user = $request->user();

        if ($user->role !== 'admin' && $wasteListing->farmer_id !== $user->id) {
            abort(403);
        }

        foreach ($wasteListing->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $wasteListing->delete();

        return response()->json(['message' => 'Listing deleted']);
    }
}
