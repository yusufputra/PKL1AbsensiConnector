<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class dataAbsen extends Model
{
    protected $fillable = [
        'idKaryawan', 'date', 'serial_no',
    ];
}
