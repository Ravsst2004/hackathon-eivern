<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia; // Jangan lupa untuk mengimpor Inertia

class EventDetailController extends Controller
{
    /**
     * Menampilkan halaman detail untuk satu event.
     *
     * @param  \App\Models\Event  $event
     * @return \Inertia\Response
     */
    // DIUBAH: Menggunakan Route Model Binding (Event $event) agar cocok dengan route '/event/{event}'
    // Laravel akan otomatis mencari event berdasarkan ID dan memberikan 404 jika tidak ditemukan.
    public function show(Event $event)
    {
        // Muat relasi yang diperlukan. Anda bisa menambahkan relasi lain di sini.
        $event->load(['ormawa', 'pembicaraEvents']);

        
        // Ambil beberapa event lain untuk ditampilkan di sidebar "Acara Lainnya"
        $otherEvents = Event::where('id', '!=', $event->id)
                            ->latest()
                            ->take(5)
                            ->get();
        // dd($event->toArray(), $otherEvents->toArray());
        // DIUBAH: Gunakan Inertia::render untuk menampilkan komponen frontend
        // dan kirim data '$event' dan '$otherEvents' sebagai props.
        return Inertia::render('Events/Index', [
            'event' => $event,
            'otherEvents' => $otherEvents,
        ]);
    }
}
