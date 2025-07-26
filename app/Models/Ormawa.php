<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ormawa extends Model
{
    use SoftDeletes;
    
    protected $table = 'ormawa';
    protected $fillable = ['nama', 'logo', 'deskripsi', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'nim');
    }

    public function events()
    {
        return $this->hasMany(Event::class, 'ormawa_id');
    }
}
