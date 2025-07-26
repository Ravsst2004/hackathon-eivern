<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventDetailController extends Controller
{
    public function show($id)
    {
        $event = Event::with(['pembicaraEvents'])
            ->where('id', $id)
            ->first();

        if (!$event) {
            return response()->json([
                'message' => 'Event tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'event' => $event,
        ]);
    }
}
