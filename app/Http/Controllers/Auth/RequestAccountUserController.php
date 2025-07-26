<?php

namespace App\Http\Controllers\Auth;

use App\Enums\Roles;
use App\Http\Controllers\Controller;
use App\Models\Jurusan;
use App\Models\RequestAkses;
use App\Models\Role;
use App\Models\User;
use App\Notifications\AccountForUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class RequestAccountUserController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'nim' => 'required',
        ]);
        RequestAkses::create([
            'email' => $request->email,
            'nim' => $request->nim
        ]);

        return redirect()->back()->with('success', 'The Request has been sent, wait for the admin to approve');
    }

    public function approveAccountPage ()
    {
        $account = RequestAkses::All();

        // return ni rav
    }

    public function approveAccount (string $id)
    {
        $account = RequestAkses::findOrFail($id);
        $randomPassword = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $user = User::create([
            'nim' => $account->nim,
            'name' => $account->email,
            'email' => $account->email,
            'password' => bcrypt($randomPassword),
            'id_jurusan' => Jurusan::inRandomOrder()->first()->id,
            'id_role' => Role::where('nama', Roles::MAHASISWA->value)->first()->id,
        ]);

        $user->notify(new AccountForUser($account->nim, $randomPassword));
        $account->delete();
        return redirect()->back()->with('success', 'Akun berhasil dibuat dan notifikasi telah dikirim');

    }
}
