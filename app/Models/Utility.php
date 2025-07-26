<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Utility extends Model
{
    protected $table = 'utilities';
    protected $fillable = ['max_skkm', 'logo'];
}
