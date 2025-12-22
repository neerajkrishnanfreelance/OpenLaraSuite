<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HrContact extends Model
{
    protected $fillable = [
        'name', 
        'email', 
        'phone', 
        'company', 
        'position', 
        'status'
    ];
}
