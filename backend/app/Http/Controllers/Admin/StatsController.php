<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CategoryRequest;
use App\Models\User;
use App\Models\WasteListing;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $activeListings = WasteListing::where('status', 'Approved')->count();
        $revenue = (float) WasteListing::where('status', 'Sold')->sum('price');
        $pendingReviews = WasteListing::where('status', 'Pending')->count()
            + CategoryRequest::where('status', 'Pending')->count();

        $now = now();
        $lastMonth = now()->subMonth();

        $thisMonthUsers = User::whereYear('created_at', $now->year)->whereMonth('created_at', $now->month)->count();
        $lastMonthUsers = User::whereYear('created_at', $lastMonth->year)->whereMonth('created_at', $lastMonth->month)->count();
        $userGrowthPercent = $this->growthPercent($lastMonthUsers, $thisMonthUsers);

        $thisMonthRevenue = (float) WasteListing::where('status', 'Sold')
            ->whereYear('updated_at', $now->year)->whereMonth('updated_at', $now->month)->sum('price');
        $lastMonthRevenue = (float) WasteListing::where('status', 'Sold')
            ->whereYear('updated_at', $lastMonth->year)->whereMonth('updated_at', $lastMonth->month)->sum('price');
        $revenueGrowthPercent = $this->growthPercent($lastMonthRevenue, $thisMonthRevenue);

        $userGrowthSeries = [];
        $revenueSeries = [];

        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);

            $userGrowthSeries[] = [
                'month' => $month->format('M'),
                'users' => User::whereYear('created_at', $month->year)->whereMonth('created_at', $month->month)->count(),
            ];

            $revenueSeries[] = [
                'month' => $month->format('M'),
                'amount' => (float) WasteListing::where('status', 'Sold')
                    ->whereYear('updated_at', $month->year)->whereMonth('updated_at', $month->month)->sum('price'),
            ];
        }

        return response()->json([
            'total_users' => $totalUsers,
            'active_listings' => $activeListings,
            'revenue' => $revenue,
            'pending_reviews' => $pendingReviews,
            'user_growth_percent' => $userGrowthPercent,
            'revenue_growth_percent' => $revenueGrowthPercent,
            'user_growth_series' => $userGrowthSeries,
            'revenue_series' => $revenueSeries,
        ]);
    }

    private function growthPercent(float $previous, float $current): ?float
    {
        if ($previous > 0) {
            return round((($current - $previous) / $previous) * 100, 1);
        }

        return $current > 0 ? 100.0 : null;
    }
}
