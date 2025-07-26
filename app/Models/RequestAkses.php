<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestAkses extends Model
{
    protected $table = 'request_akses';
    protected $fillable = ['email', 'nim'];
}
