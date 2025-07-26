<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    protected $primaryKey = 'nim';
    public $incrementing = false;
    protected $keyType = 'string';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
     protected $fillable = [
        'nim', 
        'name',
        'email', 
        'password', 
        'id_jurusan', 
        'id_role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // relations
    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class, 'id_jurusan');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'id_role');
    }

    public function ormawa()
    {
        return $this->hasOne(Ormawa::class, 'user_id', 'nim');
    }

    public function sertifikatEvents()
    {
        return $this->hasMany(SertifikatEvent::class, 'id_user', 'nim');
    }
}
