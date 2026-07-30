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
        $query = CategoryRequest::with('farmer:id,name');

        if ($user->role !== 'admin') {
            $query->where('farmer_id', $user->id);
        }

        return $query->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
        ]);

        $categoryExists = Category::whereRaw(
            'LOWER(name) = ?',
            [strtolower($data['name'])]
        )->exists();

        if ($categoryExists) {
            return response()->json([
                'message' => 'This category already exists.',
            ], 422);
        }

        $requestExists = CategoryRequest::whereRaw(
            'LOWER(name) = ?',
            [strtolower($data['name'])]
        )
            ->where('status', 'Pending')
            ->exists();

        if ($requestExists) {
            return response()->json([
                'message' => 'This category has already been requested.',
            ], 422);
        }

        $categoryRequest = CategoryRequest::create([
            'farmer_id' => $request->user()->id,
            'name' => trim($data['name']),
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Category request submitted successfully.',
            'category_request' => $categoryRequest,
        ], 201);
    }

    public function update(Request $request, CategoryRequest $categoryRequest)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $data = $request->validate([
            'status' => 'required|in:Approved,Rejected',
            'admin_note' => 'nullable|string',
        ]);

        $categoryRequest->update($data);

        if ($data['status'] === 'Approved') {
            Category::firstOrCreate(
                ['name' => $categoryRequest->name],
                ['description' => null]
            );
        }

        return $categoryRequest->fresh('farmer:id,name');
    }
}