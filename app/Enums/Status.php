<?php 

namespace App\Enums;

enum Status : string 
{
    case APPROVE = 'ACTIVE';
    case UPLOAD = 'UPLOAD';
    case REQUEST = 'REQUEST';
}