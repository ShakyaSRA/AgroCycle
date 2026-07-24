<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function conversations(Request $request)
    {
        $userId = $request->user()->id;

        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender:id,name,role', 'receiver:id,name,role'])
            ->orderByDesc('created_at')
            ->get();

        $conversations = [];

        foreach ($messages as $message) {
            $otherUser = $message->sender_id === $userId ? $message->receiver : $message->sender;

            if (! isset($conversations[$otherUser->id])) {
                $conversations[$otherUser->id] = [
                    'user' => $otherUser,
                    'last_message' => $message->body,
                    'last_message_at' => $message->created_at,
                    'unread_count' => 0,
                ];
            }

            if ($message->receiver_id === $userId && $message->read_at === null) {
                $conversations[$otherUser->id]['unread_count']++;
            }
        }

        return response()->json(array_values($conversations));
    }

    public function show(Request $request, $userId)
    {
        $authId = $request->user()->id;

        Message::where('sender_id', $userId)
            ->where('receiver_id', $authId)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return Message::where(function ($q) use ($authId, $userId) {
            $q->where('sender_id', $authId)->where('receiver_id', $userId);
        })
            ->orWhere(function ($q) use ($authId, $userId) {
                $q->where('sender_id', $userId)->where('receiver_id', $authId);
            })
            ->with('sender:id,name,role')
            ->orderBy('created_at')
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'listing_id' => 'nullable|exists:waste_listings,id',
            'body' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $data['receiver_id'],
            'listing_id' => $data['listing_id'] ?? null,
            'body' => $data['body'],
        ]);

        return response()->json($message->load('sender:id,name,role'), 201);
    }
}
