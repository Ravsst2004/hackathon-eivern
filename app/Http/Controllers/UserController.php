<?php

namespace App\Http\Controllers;

use app\Enums\Roles;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Jurusan;
use Inertia\Controller;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['jurusan', 'role'])->latest()->get();
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        // Role Filtering
        $assignableRoles = match ($user->role->nama) {
            Roles::SUPER_ADMIN->value => [Roles::BEM->value, Roles::KEMAHASISWAAN->value, Roles::ORMAWA->value],
            Roles::BEM->value => [Roles::ORMAWA->value, Roles::MAHASISWA->value],
            Roles::KEMAHASISWAAN->value => [Roles::ORMAWA->value, Roles::MAHASISWA->value, Roles::BEM->value],
            default => [],
        };

        $roles = Role::whereIn('nama', $assignableRoles)->get();
        $jurusan = Jurusan::all();

        return Inertia::render('Users/Create', [
            'roles' => $roles,
            'jurusan' => $jurusan,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $assignableRoles = match ($user->role->nama) {
            Roles::SUPER_ADMIN->value => [Roles::BEM->value, Roles::KEMAHASISWAAN->value, Roles::ORMAWA->value],
            Roles::BEM->value => [Roles::ORMAWA->value, Roles::MAHASISWA->value],
            Roles::KEMAHASISWAAN->value => [Roles::ORMAWA->value, Roles::MAHASISWA->value, Roles::BEM->value],
            default => [],
        };

        $request->validate([
            'nim' => 'required|unique:users,nim|size:16',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'idJurusan' => 'required|exists:jurusan,id',
            'idRole' => 'required|exists:role,id',
        ]);

        // Validasi role yang boleh diberikan
        $selectedRole = Role::findOrFail($request->id_role);
        if (!in_array($selectedRole->nama, $assignableRoles)) {
            abort(403, 'Anda tidak memiliki izin untuk memberikan role ini.');
        }

        $password = Str::random(8);

        $newUser = User::create([
            'nim' => $request->nim,
            'name' => $request->name,
            'email' => $request->email,
            'idJurusan' => $request->id_jurusan,
            'idRole' => $request->id_role,
            'password' => Hash::make($password),
        ]);

        // Kirim Email
        Mail::raw("Akun Anda berhasil dibuat.\nNIM: {$newUser->nim}\nPassword: {$password}", function ($message) use ($newUser) {
            $message->to($newUser->email)
                ->subject('Akun Baru');
        });

        return redirect()->back()->with('success', 'User berhasil dibuat.');

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('Users/Show', ['user' => $user->load(['jurusan', 'role'])]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $userLogin = Auth::user();

        $assignableRoles = match ($userLogin->role->nama) {
            Roles::SUPER_ADMIN->value => [Roles::BEM->value, Roles::KEMAHASISWAAN->value, Roles::ORMAWA->value],
            Roles::BEM->value => [Roles::ORMAWA->value, Roles::MAHASISWA->value],
            Roles::KEMAHASISWAAN->value => [Roles::ORMAWA->value, Roles::MAHASISWA->value, Roles::BEM->value],
            default => [],
        };

        $roles = Role::whereIn('nama', $assignableRoles)->get();
        $jurusan = Jurusan::all();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'jurusan' => $jurusan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $userLogin = Auth::user();

        $assignableRoles = match ($userLogin->role->nama) {
            Roles::SUPER_ADMIN->value => [Roles::BEM->value, Roles::KEMAHASISWAAN->value, Roles::ORMAWA->value],
            Roles::BEM->value => [Roles::ORMAWA->value, Roles::MAHASISWA->value],
            Roles::KEMAHASISWAAN->value => [Roles::ORMAWA->value, Roles::MAHASISWA->value, Roles::BEM->value],
            default => [],
        };

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->nim . ',nim',
            'idJurusan' => 'required|exists:jurusan,id',
            'idRole' => 'required|exists:role,id',
        ]);

        $selectedRole = Role::findOrFail($request->id_role);
        if (!in_array($selectedRole->nama, $assignableRoles)) {
            abort(403, 'Anda tidak memiliki izin untuk memberikan role ini.');
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'idJurusan' => $request->id_jurusan,
            'idRole' => $request->id_role,
        ]);

        return redirect()->back()->with('success', 'User berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete(); // soft delete
        return redirect()->back()->with('success', 'User berhasil dihapus.');
    }

}
