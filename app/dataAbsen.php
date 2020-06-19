<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class dataAbsen extends Model
{
    protected $fillable = [
        'nik', 'date', 'serial_no',
    ];
}
