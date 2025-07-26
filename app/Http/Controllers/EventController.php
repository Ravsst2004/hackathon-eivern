<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Ormawa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $query = Event::query();

        if ($user->role->nama === Roles::ORMAWA->value) {
            $query->where('ormawa_id', $user->ormawa->id);
        }

        $events = $query->with('sertifikatEvents')->get();
        $ormawa = Ormawa::all();

        // return $events;

        return Inertia::render('event', [
            'events' => $events,
            'ormawa' => $ormawa,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'logo' => 'required|max:255',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
            'ormawa' => 'required',
        ]);


        $user = Auth::user();
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('ormawa', 'public');
            $validated['logo'] = $path; // simpan path ke DB
        }

        $validated['ormawa_id'] = $request->ormawa;

        Event::create($validated);

        return redirect()->back()->with('success', 'Event berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        $user = Auth::user();

        if ($user->role_enum === Roles::ORMAWA && $event->ormawa_id !== $user->ormawa->id) {
            abort(403);
        }

        return Inertia::render('Events/Edit', [
            'event' => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $user = Auth::user();

        if ($user->role_enum === Roles::ORMAWA && $event->ormawa_id !== $user->ormawa->id) {
            abort(403);
        }

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'logo' => 'nullable|max:255',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('ormawa', 'public');
            $validated['logo'] = $path; // simpan path ke DB
        }


        $event->update($validated);

        return redirect()->back()->with('success', 'Event berhasil diperbarui.');
    }
    public function all_event()
    {
        // Ambil semua event, urutkan dari yang terbaru,
        // dan gunakan paginate() untuk membaginya per halaman (misal: 12 item per halaman).
        // Laravel akan secara otomatis menangani halaman saat ini berdasarkan query string di URL (?page=2).
        $events = Event::latest()->paginate(12);

        // Kirim data $events yang sudah dipaginasi ke komponen 'Event/Index'.
        // Pastikan nama komponen 'Event/Index' sesuai dengan nama file Anda.
        return Inertia::render('Events/AllEvents', [
            'events' => $events,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $user = Auth::user();

        if ($user->role_enum === Roles::ORMAWA && $event->ormawa_id !== $user->ormawa->id) {
            abort(403);
        }

        $event->delete();

        return redirect()->back()->with('success', 'Event berhasil dihapus.');
    }
}
