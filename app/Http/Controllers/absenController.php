<?php

namespace App\Http\Controllers;

use App\dataAbsen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function Symfony\Component\VarDumper\Dumper\esc;

class absenController extends Controller
{
    public function inputAbsen($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'date' => 'required|string',
            'serial_no' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $absen = dataAbsen::create([
            'idKaryawan' => $request->id,
            'date' => $request->date,
            'serial_no' => $request->serial_no,
        ]);

        return response()->json(['message' => "success", "data" => $absen]);
    }

    public function getDataBySerialNum($Sno)
    {
        $data = dataAbsen::where('serial_no', $Sno)->get();
        if(sizeof($data)>0){
            return response()->json(['data' => $data],200);
        }else{
            return response()->json(['error' => "data tidak ditemukan"],404);
        }
    }
}
