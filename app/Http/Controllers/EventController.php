<?php

namespace App\Http\Controllers;

use app\Enums\Roles;
use Inertia\Inertia;
use App\Models\Event;
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

        $events = match ($user->role_enum) {
            Roles::ORMAWA => Event::where('ormawa_id', $user->ormawa->id)->get(),
            default => Event::all()
        };

        return Inertia::render('Events/Index', [
            'events' => $events
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
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'logo' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $user = Auth::user();
        $validated['ormawa_id'] = $user->ormawa->id;

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
            'logo' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $event->update($validated);

        return redirect()->back()->with('success', 'Event berhasil diperbarui.');
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
