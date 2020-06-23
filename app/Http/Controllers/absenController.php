<?php

namespace App\Http\Controllers;

use App\dataAbsen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use function Symfony\Component\VarDumper\Dumper\esc;

class absenController extends Controller
{
    public function inputAbsen($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
            'date' => 'required|string',
            'serial_no' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $absen = dataAbsen::create([
            'nik' => $request->id,
            'date' => $request->date,
            'serial_no' => $request->serial_no,
        ]);

        return response()->json(['message' => "success", "data" => $absen]);
    }

    public function getAllAbsen()
    {
        $absens = dataAbsen::get();
        foreach ($absens as $key => $absen) {
            $absen->key = $absen->id;
        }
        return response()->json($absens);
    }

    public function deleteAbsen(Request $request)
    {
        $data = dataAbsen::where('id', $request->id)->first();
        if ($data) {
            $data->delete();

            return response()->json([
                'message' => 'user berhasil dihapus',
            ]);
        } else {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }
    }

    public function getSpecifiedById($id)
    {
        $data = dataAbsen::where('id', $id)->first();
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

    public function editAbsen(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
            'nik' => 'required|string',
            'date' => 'required|string',
            'serial_no' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = dataAbsen::where('id', $request->id)->first();
        if ($data) {
            $data->nik =  $request->nik;
            $data->date = $request->date;
            $data->serial_no = $request->serial_no;
            $data->save();
            return response()->json(["message" => "success", "user" => $data], 200);
        } else {
            return response()->json(["message" => "data tidak ditemukan"], 404);
        }
    }

    public function getStatistic()
    {
        $statistik = DB::table('data_absens')
            ->select(DB::raw('SUBSTRING_INDEX(`date`," ",1) as "tanggal", SUBSTRING_INDEX(SUBSTRING_INDEX(`date`," ",-1),":",1) as "jam", COUNT(*) AS jumlah'))
            ->groupByRaw('tanggal, jam')
            ->orderBy('date', 'desc')
            ->get();
        foreach ($statistik as $key => $data) {
            $time = strtotime($data->tanggal);
            $data->tanggal = $data->tanggal . " - " . date('l', $time);
        }
        $late = DB::select(DB::raw("SELECT SUM(jumlah) as late from (SELECT SUBSTRING_INDEX(`date`,' ',1) as 'tanggal', CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(`date`,' ',-1),':',1) AS int) as 'jam', COUNT(*) AS jumlah FROM `data_absens` GROUP BY tanggal, jam ORDER BY date desc) rawData WHERE jam >= 8 and tanggal=:tgl"),array("tgl" => date('Y-m-d')));
        $intime = DB::select(DB::raw("SELECT SUM(jumlah) as intime from (SELECT SUBSTRING_INDEX(`date`,' ',1) as 'tanggal', CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(`date`,' ',-1),':',1) AS int) as 'jam', COUNT(*) AS jumlah FROM `data_absens` GROUP BY tanggal, jam ORDER BY date desc) rawData WHERE jam < 8 and tanggal=:tgl"),array("tgl" => date('Y-m-d')));
        return response()->json(["statistik" => $statistik, "late" => $late, "intime" => $intime]);


    }
}
