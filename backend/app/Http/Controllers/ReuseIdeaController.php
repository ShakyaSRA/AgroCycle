<?php

namespace App\Http\Controllers;

use App\Models\ReuseIdea;
use Illuminate\Http\Request;

class ReuseIdeaController extends Controller
{
    public function index()
    {
        return ReuseIdea::with('user:id,name')
            ->where('status', 'Approved')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:150',
            'items' => 'required|array|min:2|max:4',
            'items.*' => 'required|string|max:100',
        ]);

        $idea = ReuseIdea::create([
            'user_id' => $request->user()->id,
            'title' => $data['title'],
            'items' => $data['items'],
            'status' => 'Pending',
        ]);

        return response()->json($idea, 201);
    }

    public function adminIndex()
    {
        return ReuseIdea::with('user:id,name')
            ->where('status', 'Pending')
            ->latest()
            ->get();
    }

    public function update(Request $request, ReuseIdea $reuseIdea)
    {
        $data = $request->validate([
            'status' => 'required|in:Approved,Rejected',
            'icon' => 'required_if:status,Approved|string|in:wheat,shell,cherry,sprout,leaf,recycle,lightbulb',
        ]);

        $reuseIdea->update($data);

        return $reuseIdea->fresh('user:id,name');
    }
}
