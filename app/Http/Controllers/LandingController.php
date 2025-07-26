<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Support\Facades\Response;

class LandingController extends Controller
{
    public function index()
    {
        // Ambil semua event mendatang
        $events = Event::with('ormawa')
            ->where('tanggal', '>=', now())
            ->orderBy('tanggal', 'asc')
            ->get();

        return response()->json([
            'events' => $events,
        ]);
    }

    
}
