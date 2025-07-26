<?php

namespace App\Imports;

use App\Enums\Status;
use App\Models\SertifikatEvent;
use Maatwebsite\Excel\Concerns\ToModel;

class SertifikatImport implements ToModel
{

    protected $eventId;

    public function __construct($eventId)
    {
        $this->eventId = $eventId;
    }
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
       // Lewati baris header
        if ($row[0] === 'kegiatan') {
            return null;
        }

        return new SertifikatEvent([
            'kegiatan' => $row[0],
            'nama_peserta' => $row[1],
            'tingkat' => $row[2],
            'partisipasi' => $row[3],
            'skkm' => (int) $row[4],
            'paraf_bem' => Status::UPLOAD->value,
            'paraf_kemahasiswaan' => Status::UPLOAD->value,
            'photo_sertifikat' => null,
            'id_uniq_sertif' => null,
            'id_user' => null, 
            'id_event' => $this->eventId,  
        ]);
    }
}
