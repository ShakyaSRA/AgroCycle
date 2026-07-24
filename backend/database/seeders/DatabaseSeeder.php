<?php

namespace Database\Seeders;

use App\Models\BuyerRequest;
use App\Models\Category;
use App\Models\Message;
use App\Models\User;
use App\Models\WasteListing;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = $this->makeUser('AgroCycle Admin', 'admin@agrocycle.test', 'admin', now()->subMonths(6));

        $farmers = [
            $this->makeUser('Rajesh Kumar', 'rajesh@agrocycle.test', 'farmer', now()->subMonths(5), '077 123 4567', 'Kandy'),
            $this->makeUser('Sunita Devi', 'sunita@agrocycle.test', 'farmer', now()->subMonths(4), '071 234 5678', 'Anuradhapura'),
            $this->makeUser('Green Valley Farms', 'greenvalley@agrocycle.test', 'farmer', now()->subMonths(2), '076 345 6789', 'Matale'),
        ];

        $buyers = [
            $this->makeUser('Green Recycling Co.', 'greenrecycling@agrocycle.test', 'buyer', now()->subMonths(5), '070 456 7890', 'Colombo'),
            $this->makeUser('Eco Products Ltd.', 'ecoproducts@agrocycle.test', 'buyer', now()->subMonths(3), '072 567 8901', 'Gampaha'),
            $this->makeUser('Coco Craft Industries', 'cococraft@agrocycle.test', 'buyer', now()->subMonth(), '078 678 9012', 'Kurunegala'),
        ];

        $categoryNames = [
            'Rice Husk' => 'Husk left over after rice milling, used for fertilizer and fuel.',
            'Coconut Shell' => 'Dried coconut shells, used for charcoal and craft production.',
            'Wheat Straw' => 'Dry wheat straw, used for animal feed, composting and biofuel.',
            'Sugarcane Bagasse' => 'Fibrous residue from sugarcane pressing, used for bioenergy.',
            'Banana Leaves' => 'Waste banana leaves, used for packaging and composting.',
        ];

        $categories = [];
        foreach ($categoryNames as $name => $description) {
            $categories[$name] = Category::create(['name' => $name, 'description' => $description]);
        }

        $listingsData = [
            ['farmer' => 0, 'category' => 'Rice Husk', 'qty' => 500, 'unit' => 'kg', 'price' => 4500, 'status' => 'Sold', 'monthsAgo' => 5, 'location' => 'Katugastota, Kandy', 'desc' => 'Fresh rice husk from recent harvest, suitable for fertilizer production.'],
            ['farmer' => 0, 'category' => 'Coconut Shell', 'qty' => 300, 'unit' => 'kg', 'price' => 3000, 'status' => 'Sold', 'monthsAgo' => 4, 'location' => 'Katugastota, Kandy', 'desc' => 'Clean coconut shells, perfect for charcoal or craft production.'],
            ['farmer' => 1, 'category' => 'Wheat Straw', 'qty' => 1000, 'unit' => 'kg', 'price' => 6000, 'status' => 'Sold', 'monthsAgo' => 3, 'location' => 'Anuradhapura', 'desc' => 'Dry wheat straw available for biofuel or animal feed.'],
            ['farmer' => 1, 'category' => 'Banana Leaves', 'qty' => 200, 'unit' => 'kg', 'price' => null, 'status' => 'Approved', 'monthsAgo' => 2, 'location' => 'Anuradhapura', 'desc' => 'Waste banana leaves, free for collection, ideal for composting.'],
            ['farmer' => 2, 'category' => 'Sugarcane Bagasse', 'qty' => 700, 'unit' => 'kg', 'price' => 5600, 'status' => 'Sold', 'monthsAgo' => 2, 'location' => 'Matale', 'desc' => 'Organic sugarcane waste suitable for bioenergy production.'],
            ['farmer' => 2, 'category' => 'Sugarcane Bagasse', 'qty' => 650, 'unit' => 'kg', 'price' => 5200, 'status' => 'Approved', 'monthsAgo' => 1, 'location' => 'Matale', 'desc' => 'Organic sugarcane waste suitable for bioenergy production.'],
            ['farmer' => 0, 'category' => 'Rice Husk', 'qty' => 450, 'unit' => 'kg', 'price' => 4000, 'status' => 'Approved', 'monthsAgo' => 0, 'location' => 'Katugastota, Kandy', 'desc' => 'Fresh rice husk, suitable for fertilizer production.'],
            ['farmer' => 1, 'category' => 'Wheat Straw', 'qty' => 800, 'unit' => 'kg', 'price' => 4800, 'status' => 'Pending', 'monthsAgo' => 0, 'location' => 'Anuradhapura', 'desc' => 'Dry wheat straw, newly listed, awaiting review.'],
            ['farmer' => 2, 'category' => 'Coconut Shell', 'qty' => 10000, 'unit' => 'kg', 'price' => 50, 'status' => 'Pending', 'monthsAgo' => 0, 'location' => 'Unknown', 'desc' => 'Bulk coconut shells, unusually large quantity for the price listed.'],
        ];

        $listings = [];
        foreach ($listingsData as $data) {
            $createdAt = now()->subMonths($data['monthsAgo'])->subDays(rand(1, 20));
            $listing = WasteListing::create([
                'farmer_id' => $farmers[$data['farmer']]->id,
                'category_id' => $categories[$data['category']]->id,
                'quantity' => $data['qty'],
                'unit' => $data['unit'],
                'price' => $data['price'],
                'location' => $data['location'],
                'description' => $data['desc'],
                'status' => $data['status'],
            ]);

            $updatedAt = $data['status'] === 'Sold' ? $createdAt->copy()->addDays(rand(2, 10)) : $createdAt;
            $listing->forceFill(['created_at' => $createdAt, 'updated_at' => $updatedAt])->save();
            $listings[] = $listing;
        }

        // Buyer requests: accepted ones for Sold listings, a couple pending/rejected for Approved ones.
        foreach ($listings as $i => $listing) {
            if ($listing->status === 'Sold') {
                $buyer = $buyers[$i % count($buyers)];
                $req = BuyerRequest::create([
                    'listing_id' => $listing->id,
                    'buyer_id' => $buyer->id,
                    'message' => 'Interested in purchasing this for our operations.',
                    'status' => 'Accepted',
                ]);
                $req->forceFill(['created_at' => $listing->created_at, 'updated_at' => $listing->updated_at])->save();
            }
        }

        BuyerRequest::create([
            'listing_id' => $listings[5]->id,
            'buyer_id' => $buyers[1]->id,
            'message' => 'Interested in purchasing for biofuel production. Can you confirm quality?',
            'status' => 'Pending',
        ]);

        BuyerRequest::create([
            'listing_id' => $listings[6]->id,
            'buyer_id' => $buyers[2]->id,
            'message' => 'Need this for composting. Can pickup this week.',
            'status' => 'Pending',
        ]);

        // A short message thread between a farmer and a buyer tied to a sold listing.
        $thread = [
            [$farmers[0], $buyers[0], 'Hi, thanks for your interest in the rice husk listing.'],
            [$buyers[0], $farmers[0], 'Great, is 500kg still available and can you deliver to Colombo?'],
            [$farmers[0], $buyers[0], 'Yes, still available. Delivery can be arranged for an extra charge.'],
            [$buyers[0], $farmers[0], 'Sounds good, let\'s proceed.'],
        ];

        $base = now()->subMonths(5)->addDays(2);
        foreach ($thread as $j => [$sender, $receiver, $body]) {
            $message = Message::create([
                'sender_id' => $sender->id,
                'receiver_id' => $receiver->id,
                'listing_id' => $listings[0]->id,
                'body' => $body,
            ]);
            $message->forceFill(['created_at' => $base->copy()->addMinutes($j * 10), 'updated_at' => $base->copy()->addMinutes($j * 10)])->save();
        }
    }

    private function makeUser(string $name, string $email, string $role, $createdAt, ?string $phone = null, ?string $location = null): User
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make('password'),
            'role' => $role,
            'phone' => $phone,
            'location' => $location,
        ]);

        $user->forceFill(['created_at' => $createdAt, 'updated_at' => $createdAt])->save();

        return $user;
    }
}
