<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::where('role', '!=', 'admin')
            ->withCount([
                'listings',
                'buyerRequests as purchases_count' => fn ($q) => $q->where('status', 'Accepted'),
            ])
            ->latest()
            ->get();
    }

    public function toggleStatus(User $user)
    {
        $user->update(['is_active' => ! $user->is_active]);

        return $user->fresh();
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }
}
