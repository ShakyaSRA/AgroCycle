<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryRequest;
use Illuminate\Http\Request;

class CategoryRequestController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = CategoryRequest::with('farmer')->latest();

        if ($user->role === 'farmer') {
            $query->where('farmer_id', $user->id);
        } elseif ($user->role !== 'admin') {
            abort(403);
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $categoryRequest = CategoryRequest::create([
            'farmer_id' => $request->user()->id,
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'status' => 'Pending',
        ]);

        return response()->json($categoryRequest, 201);
    }

    public function update(Request $request, CategoryRequest $categoryRequest)
    {
        $data = $request->validate([
            'status' => 'required|in:Approved,Rejected',
            'admin_note' => 'nullable|string',
        ]);

        $categoryRequest->update($data);

        if ($data['status'] === 'Approved') {
            Category::firstOrCreate(
                ['name' => $categoryRequest->name],
                ['description' => $categoryRequest->description]
            );
        }

        return $categoryRequest->fresh();
    }
}
