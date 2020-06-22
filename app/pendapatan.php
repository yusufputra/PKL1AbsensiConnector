<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class pendapatan extends Model
{
    protected $fillable = [
        'nik', 'bulan', 'tahun', 'gaji_pokok','bpjs','pph21'
    ];
}
