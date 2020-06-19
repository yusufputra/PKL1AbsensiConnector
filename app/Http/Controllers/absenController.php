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

    // public function getDataBySerialNum($Sno)
    // {
    //     $data = dataAbsen::where('serial_no', $Sno)->get();
    //     if(sizeof($data)>0){
    //         return response()->json(['data' => $data],200);
    //     }else{
    //         return response()->json(['error' => "data tidak ditemukan"],404);
    //     }
    // }
}
