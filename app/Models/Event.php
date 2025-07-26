<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $table = 'events';
    protected $fillable = ['nama', 'logo', 'deskripsi', 'tanggal', 'ormawa_id'];

    public function ormawa()
    {
        return $this->belongsTo(Ormawa::class);
    }

    public function pembicaraEvents()
    {
        return $this->hasMany(PembicaraEvent::class, 'id_events');
    }

    public function sertifikatEvents()
    {
        return $this->hasMany(SertifikatEvent::class, 'id_event');
    }
}
