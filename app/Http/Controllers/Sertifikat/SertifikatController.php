<?php

namespace App\Http\Controllers\Sertifikat;

use App\Enums\Roles;
use App\Enums\Status;
use App\Exports\SertifikatExport;
use App\Http\Controllers\Controller;
use App\Imports\SertifikatImport;
use App\Models\Event;
use App\Models\SertifikatEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class SertifikatController extends Controller
{


    public function importExcel(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
            'eventId' => 'required|exists:events,id',
        ]);

        Excel::import(new SertifikatImport($request->eventId), $request->file('file'));

        return back()->with('success', 'Import berhasil.');
    }

    public function uniqIdGenerate(Request $request)
    {
        $request->validate([
            'eventId' => 'required|exists:events,id',
            'uniqId' => 'string'
        ]);

        $data = SertifikatEvent::where('id_event', $request->eventId)->get();
        $counter = 1;

        foreach ($data as $sertifikat) {
            $prefix = str_pad($counter, 2, '0', STR_PAD_LEFT); // Jadi 01, 02, 03, ...
            $sertifikat->id_uniq_sertif = $prefix . '/' . $request->uniqId;
            $sertifikat->save();
            $counter++;
        }


        return back()->with('success', 'Uniq ID berhasil di generate.');
    }

    public function requestUniqIdIndex()
    {
        $data = Event::with(['sertifikatEvents' => function ($query) {
            $query->whereNull('id_uniq_sertif');
        }])->get();
        return inertia('uniqid-request', compact('data'));
    }

    public function uploadSertifikat(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'uniqId' => 'required|exists:sertifikat_events,id_uniq_sertif',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        $sertifikat = SertifikatEvent::where('id_uniq_sertif', $request->uniqId)->first();
        $sertifikat->photo_sertifikat = $request->file('img')->store('sertifikat', 'public');
        $sertifikat->id_user = $user->nim;
        $sertifikat->save();

        return back()->with('success', 'Sertifikat berhasil di upload.');
    }

    public function exportToexcel(string $eventId)
    {
        $namaEvent = Event::where('id', $eventId)->first()->nama;
        return Excel::download(new SertifikatExport($eventId), 'sertifikat_event_' . $namaEvent . '.xlsx');
    }

    public function requestParaf(Request $request)
    {
        $request->validate([
            'sertifId' => 'required|exists:sertifikat_events,id_uniq_sertif',
        ]);

        $sertifikat = SertifikatEvent::where('id_uniq_sertif', $request->sertifId)->first();
        $sertifikat->paraf_bem = Status::REQUEST->value;
        $sertifikat->paraf_kemahasiswaan = Status::REQUEST->value;
        $sertifikat->save();
        return back()->with('success', 'Sertifikat berhasil di request.');
    }

    public function approveParaf(Request $request)
    {
        $request->validate([
            'sertifId' => 'required|exists:sertifikat_events,id_uniq_sertif',
            'typeParaf' => 'required|in:BEM,KEMAHASISWAAN',
        ]);

        if ($request->typeParaf == 'BEM') {
            $sertifikat = SertifikatEvent::where('id_uniq_sertif', $request->sertifId)->first();
            $sertifikat->paraf_bem = Status::APPROVE->value;
            $sertifikat->save();
            return back()->with('success', 'Sertifikat berhasil di approve.');
        }
        if ($request->typeParaf == 'KEMAHASISWAAN') {
            $sertifikat = SertifikatEvent::where('id_uniq_sertif', $request->sertifId)->first();
            $sertifikat->paraf_kemahasiswaan = Status::APPROVE->value;
            $sertifikat->save();
            return back()->with('success', 'Sertifikat berhasil di approve.');
        }
    }

    public function indexParaf()
    {
        $user = Auth::user();
        if ($user->role->nama == Roles::BEM->value) {
            // dd($user);
            $sertifikat = SertifikatEvent::where('paraf_bem', Status::REQUEST->value)->get();
        } elseif ($user->role->nama == Roles::KEMAHASISWAAN->value) {
            $sertifikat = SertifikatEvent::where('paraf_kemahasiswaan', Status::REQUEST->value)->get();
        } elseif ($user->role->nama == Roles::SUPER_ADMIN->value) {
            $sertifikat = SertifikatEvent::where(function ($query) {
                $query->where('paraf_bem', Status::REQUEST->value)
                    ->orWhere('paraf_kemahasiswaan', Status::REQUEST->value);
            })->get();
        } else {
            $sertifikat = [];
        }
        return inertia('paraf-request', compact('sertifikat'));
    }
}
