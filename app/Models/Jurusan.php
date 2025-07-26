<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jurusan extends Model
{
    use SoftDeletes;
    
    protected $table = 'jurusan';
    protected $fillable = ['nama'];

    public function users()
    {
        return $this->hasMany(User::class, 'id_jurusan');
    }
}
