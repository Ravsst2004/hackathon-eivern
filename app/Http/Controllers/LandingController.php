<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
// Carbon dan Response tidak digunakan secara langsung di sini, tapi bisa dibiarkan
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;

class LandingController extends Controller
{
    /**
     * Menampilkan halaman landing page dan mengirim data event.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Ambil semua event yang akan datang, beserta relasi 'ormawa'
        $events = Event::with('ormawa')->limit(6)
            ->get();

        // Kirim data $events ke komponen 'LandingPage/index' sebagai prop bernama 'events'.
        // Ini adalah cara yang benar untuk mengirim data dengan Inertia.

        return Inertia::render('LandingPage/index', [
            'events' => $events,
        ]);
    }
}
