<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PembicaraEvent extends Model
{
    use SoftDeletes;
    
    protected $table = 'pembicara_events';
    protected $fillable = ['nama', 'deskripsi', 'photo', 'id_events'];

    public function event()
    {
        return $this->belongsTo(Event::class, 'id_events');
    }
}
