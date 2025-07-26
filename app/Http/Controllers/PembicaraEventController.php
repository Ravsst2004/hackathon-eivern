<?php

namespace App\Http\Controllers;

use app\Enums\Roles;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Models\PembicaraEvent;
use Illuminate\Support\Facades\Auth;

class PembicaraEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->role->nama === Roles::ORMAWA->value) {
            $events = Event::where('ormawa_id', $user->ormawa->id)->pluck('id');
            $pembicaraEvents = PembicaraEvent::whereIn('id_events', $events)->get();
        } else {
            $pembicaraEvents = PembicaraEvent::all();
        }

        return Inertia::render('PembicaraEvent/Index', [
            'pembicaraEvents' => $pembicaraEvents,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        if ($user->role->nama === Roles::ORMAWA->value) {
            $events = Event::where('ormawa_id', $user->ormawa->id)->get();
        } else {
            $events = Event::all();
        }

        return Inertia::render('PembicaraEvent/Create', [
            'events' => $events,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'photo' => 'required|string|max:255',
            'idEvents' => 'required|exists:events,id',
        ]);

        $user = Auth::user();

        if ($user->role->nama === Roles::ORMAWA->value) {
            $event = Event::where('id', $request->id_events)->where('ormawa_id', $user->ormawa->id)->first();
            if (!$event) {
                abort(403, 'Tidak dapat menambahkan pembicara ke event yang bukan milikmu.');
            }
        }

        PembicaraEvent::create($validated);

        return redirect()->back()->with('success', 'Pembicara berhasil ditambahkan.');
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
    public function edit($id)
    {
        $pembicara = PembicaraEvent::findOrFail($id);

        $user = Auth::user();
        if ($user->role->nama === Roles::ORMAWA->value) {
            $event = Event::find($pembicara->id_events);
            if (!$event || $event->ormawa_id !== $user->ormawa->id) {
                abort(403);
            }
            $events = Event::where('ormawa_id', $user->ormawa->id)->get();
        } else {
            $events = Event::all();
        }

        return Inertia::render('PembicaraEvent/Edit', [
            'pembicara' => $pembicara,
            'events' => $events,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'photo' => 'required|string|max:255',
            'idEvents' => 'required|exists:events,id',
        ]);

        $pembicara = PembicaraEvent::findOrFail($id);

        $user = Auth::user();
        if ($user->role->nama === Roles::ORMAWA->value) {
            $event = Event::find($request->id_events);
            if (!$event || $event->ormawa_id !== $user->ormawa->id) {
                abort(403);
            }
        }

        $pembicara->update($validated);

        return redirect()->back()->with('success', 'Pembicara berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pembicara = PembicaraEvent::findOrFail($id);

        $user = Auth::user();
        if ($user->role->nama === Roles::ORMAWA->value) {
            $event = Event::find($pembicara->id_events);
            if (!$event || $event->ormawa_id !== $user->ormawa->id) {
                abort(403);
            }
        }

        $pembicara->delete();

        return redirect()->back()->with('success', 'Pembicara berhasil dihapus.');
    }
}
