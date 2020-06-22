<?php

namespace App\Http\Controllers;

use App\pendapatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class gajiController extends Controller
{
    public function getGaji()
    {
        $gaji = pendapatan::get();
        return response()->json($gaji);
    }

    public function inputGaji(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string',
            'bulan' => 'required|string',
            'tahun' => 'required|string',
            'gaji_pokok' => 'required|string',
            'bpjs' => 'required|string',
            'pph21' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $gaji = pendapatan::create([
            'nik' => $request->nik,
            'bulan' => $request->bulan,
            'tahun' => $request->tahun,
            'gaji_pokok' => $request->gaji_pokok,
            'bpjs' => $request->bpjs,
            'pph21' => $request->pph21,
        ]);

        return response(["data"=>$gaji]);
    }

    public function deleteGaji(Request $request)
    {
        $gaji = pendapatan::where('id', $request->id)->first();
        if ($gaji) {
            $gaji->delete();
            return response()->json(['message' => 'Gaji berhasil dihapus']);
        } else {
            return response()->json(['message' => 'Gaji tidak ditemukan'], 404);
        }
    }

    public function getGajibyId($id)
    {
        $data = pendapatan::where('id', $id)->first();
        if ($data) {
            return response()->json([
                'message' => 'ketemu nih',
                'gaji' => $data
            ]);
        } else {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }
    }

    public function editGaji(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string',
            'bulan' => 'required|string',
            'tahun' => 'required|string',
            'gaji_pokok' => 'required|string',
            'bpjs' => 'required|string',
            'pph21' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $data = pendapatan::where('id', $request->id)->first();
            if ($data) {
                $data->nik = $request->nik;
                $data->bulan = $request->bulan;
                $data->tahun = $request->tahun;
                $data->gaji_pokok = $request->gaji_pokok;
                $data->bpjs = $request->bpjs;
                $data->pph21 = $request->pph21;
                $data->save();
                return response()->json(["message" => "success", "gaji" => $data], 200);
            } else {
                return response()->json(["message" => "data tidak ditemukan"], 404);
            }
    }
}
