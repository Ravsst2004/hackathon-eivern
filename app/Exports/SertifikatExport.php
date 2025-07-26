<?php

namespace App\Exports;

use App\Models\SertifikatEvent;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SertifikatExport implements FromCollection, WithHeadings
{

    protected $eventId;

    public function __construct($eventId)
    {
        $this->eventId = $eventId;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return SertifikatEvent::where('id_event', $this->eventId)
            ->select('kegiatan', 'nama_peserta', 'tingkat', 'partisipasi', 'skkm', 'id_uniq_sertif')
            ->get();
    }

    public function headings(): array
    {
        return ['Kegiatan', 'Nama Peserta', 'Tingkat', 'Partisipasi', 'SKKM', 'ID Unik Sertifikat'];
    }
}
