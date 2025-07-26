<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes;
    
    protected $table = 'role';
    protected $fillable = ['nama'];

    public function users()
    {
        return $this->hasMany(User::class, 'id_role');
    }
}
