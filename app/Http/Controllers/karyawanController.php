<?php

namespace App\Http\Controllers;

use App\DataKaryawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class karyawanController extends Controller
{
    public function getAllKaryawan()
    {
        $karyawans = DataKaryawan::get();
        foreach ($karyawans as $key => $karyawan) {
            $karyawan->key = $karyawan->nik;
        }
        return response()->json($karyawans);
    }

    public function inputKaryawan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|unique:data_karyawans',
            'nama' => 'required|string',
            'nip' => 'required|string',
            'pendidikan' => 'required|string',
            'tempat_lahir' => 'required|string',
            'jenis_kelamin' => 'required|string',
            'alamat' => 'required|string',
            'no_telepon' => 'required|string',
            'agama' => 'required|string',
            'jabatan' => 'required|string',
            'status' => 'required|boolean'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $karyawan = DataKaryawan::create([
            'nik' => $request->nik,
            'nama' => $request->nama,
            'nip' => $request->nip,
            'pendidikan' => $request->pendidikan,
            'tempat_lahir' => $request->tempat_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'alamat' => $request->alamat,
            'no_telepon' => $request->no_telepon,
            'agama' => $request->agama,
            'jabatan' => $request->jabatan,
            'status_pegawai' => $request->status
        ]);
        return response()->json(["message" => "success", "data" => $karyawan]);
    }

    public function deleteKaryawan(Request $request)
    {
        $karyawan = DataKaryawan::where('nik', $request->nik)->first();
        if ($karyawan) {
            $karyawan->delete();
            return response()->json(['message' => 'karyawan berhasil dihapus']);
        } else {
            return response()->json(['message' => 'karyawan tidak ditemukan'], 404);
        }
    }

    public function getSpecifiedById($nik)
    {
        $data = DataKaryawan::where('nik', $nik)->first();
        if ($data) {
            return response()->json([
                'message' => 'ketemu nih',
                'user' => $data
            ]);
        } else {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }
    }

    public function editKaryawan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nik_baru' => 'required|string',
            'nama' => 'required|string',
            'nip' => 'required|string',
            'pendidikan' => 'required|string',
            'tempat_lahir' => 'required|string',
            'jenis_kelamin' => 'required|string',
            'alamat' => 'required|string',
            'no_telepon' => 'required|string',
            'agama' => 'required|string',
            'jabatan' => 'required|string',
            'status' => 'required|boolean'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = DataKaryawan::where('nik', $request->nik)->first();
        if ($data) {
            $data->nik = $request->nik_baru;
            $data->nama = $request->nama;
            $data->nip = $request->nip;
            $data->pendidikan = $request->pendidikan;
            $data->tempat_lahir = $request->tempat_lahir;
            $data->jenis_kelamin = $request->jenis_kelamin;
            $data->alamat = $request->alamat;
            $data->no_telepon = $request->no_telepon;
            $data->agama = $request->agama;
            $data->jabatan = $request->jabatan;
            $data->status_pegawai = $request->status;
            $data->save();
            return response()->json(["message" => "ketemu nih", "data" => $data]);
        } else {
            return response()->json(["message" => "karyawan tidak ditemukan"], 404);
        }
    }

    public function searchKaryawan(Request $request)
    {
        // $pegawai = DB::table('data_karyawans')->where('pegawai_nama', 'like', "%", $request->nik, "%");
        $pegawai = DataKaryawan::where('nik','like','%'.$request->nik.'%')->get();
        if (sizeof($pegawai)>0) {
            return response()->json(['data'=> $pegawai]);
        } else {
            return response()->json(['message'=> 'karyawan not found']);
        }
    }
}
