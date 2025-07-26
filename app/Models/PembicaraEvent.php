<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PembicaraEvent extends Model
{
    protected $table = 'pembicara_events';
    protected $fillable = ['nama', 'deskripsi', 'photo', 'id_events'];

    public function event()
    {
        return $this->belongsTo(Event::class, 'id_events');
    }
}
