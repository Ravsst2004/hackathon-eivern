<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use Inertia\Inertia;
use App\Models\Utility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UtilityController extends Controller
{
    public function edit($id)
    {
        $utility = Utility::findOrFail($id);

        // return Inertia::render('Utility/Edit', [
        //     'utility' => $utility
        // ]);

        return response()->json([
            'utility' => $utility,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        // Hanya role BEM dan KEMAHASISWAAN yang boleh update
        if (!in_array($user->role, [Roles::BEM, Roles::KEMAHASISWAAN])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'max_skkm' => 'required|integer|min:0',
            'logo' => 'required|string',
        ]);

        $utility = Utility::findOrFail($id);
        $utility->update([
            'max_skkm' => $request->max_skkm,
            'logo' => $request->logo,
        ]);

        return response()->json([
            'message' => 'Utility updated successfully',
            'utility' => $utility,
        ]);
    }
}
