<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SertifikatEvent extends Model
{
    use SoftDeletes;
    
    protected $table = 'sertifikat_events';
    protected $fillable = [
        'kegiatan', 'nama_peserta', 'tingkat', 'partisipasi', 'skkm', 'paraf_bem',
        'paraf_kemahasiswaan', 'photo_sertifikat', 'id_uniq_sertif', 'id_user', 'id_event'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'nim');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'id_event');
    }
}
