<?php 

namespace app\Enums;

enum Roles : string 
{
    case SUPER_ADMIN = 'SUPER_ADMIN';
    case BEM = 'BEM';
    case KEMAHASISWAAN = 'KEMAHASISWAAN';
    case ORMAWA = 'ORMAWA';
    case MAHASISWA = 'MAHASISWA';
}