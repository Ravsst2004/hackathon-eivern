<?php

namespace App\Http\Controllers;

use App\Models\Utility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InfoController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $utility = Utility::get();
        $data = $user->sertifikatEvents()->get();
        $totalSkkm = $data->sum('skkm');
        return inertia('profile', [
            'user' => $user,
            'utility' => $utility,
            'totalSkkm' => $totalSkkm
        ]);
    }
}
