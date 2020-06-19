<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DataKaryawan extends Model
{
    protected $fillable = [
        'nik', 'nama', 'nip', 'pendidikan', 'tempat_lahir', 'jenis_kelamin', 'alamat', 'no_telepon', 'agama', 'jabatan', 'status_pegawai'
    ];
    protected $primaryKey = 'nik';
}
