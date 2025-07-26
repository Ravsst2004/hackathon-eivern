<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use App\Models\Jurusan;
use App\Models\Ormawa;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class OrmawaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ormawa = Ormawa::with('user')->paginate(5);
        $jurusan = Jurusan::all();

        return inertia('ormawa', [
            'ormawa' => $ormawa,
            'jurusan' => $jurusan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'required',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'required|string',
            'nameUser' => 'required',
            'nim' => 'required|max:16',
            'email' => 'required|email',
            'idJurusan' => 'required|exists:jurusan,id',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('ormawa', 'public');
        }

        $userRegis = User::create([
            "nim" => $request->nim,
            'name' => $request->nameUser,
            'email' => $request->email,
            'password' => bcrypt($request->nim),
            'id_jurusan' => $request->idJurusan,
            'id_role' => Role::where('nama', Roles::ORMAWA->value)->first()->id,
        ]);

        $ormawa = Ormawa::create([
            'nama' => $request->name,
            'logo' => $path,
            'deskripsi' => $request->deskripsi,
            'user_id' => $userRegis->nim
        ]);

        return back()->with('success', 'Success Creating Ormawa');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'required|string',
            'nameUser' => 'required',
            'nim' => 'required|max:16',
            'email' => 'required|email',
            'idJurusan' => 'required|exists:jurusan,id',
        ]);

        $ormawa = Ormawa::findOrFail($id);
        $user = $ormawa->user;

        // Handle logo update jika ada file baru
        if ($request->hasFile('logo')) {
            // Hapus logo lama jika ada
            if ($ormawa->logo && Storage::disk('public')->exists($ormawa->logo)) {
                Storage::disk('public')->delete($ormawa->logo);
            }

            // Simpan logo baru
            $path = $request->file('logo')->store('ormawa', 'public');
            $ormawa->logo = $path;
        }


        // Update data ormawa
        $ormawa->nama = $request->name;
        $ormawa->deskripsi = $request->deskripsi;
        $ormawa->save();

        // Update data user yang terkait
        $user->name = $request->nameUser;
        $user->email = $request->email;
        $user->id_jurusan = $request->idJurusan;
        $user->nim = $request->nim;
        $user->save();

        return back()->with('success', 'Berhasil memperbarui Ormawa');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ormawa = Ormawa::findOrFail($id);
        $ormawa->user()->delete();
        $ormawa->delete();
        return back()->with('success', 'Berhasil menghapus Ormawa');
    }
}
