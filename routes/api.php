<?php

use App\Http\Controllers\karyawanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'UserController@login');
Route::post('{member_id}/absen', 'absenController@inputAbsen');
// Route::get('getDataAbsen/{Sno}', 'absenController@getDataBySerialNum');
Route::get('getAllAbsen', 'absenController@getAllAbsen');
// Route::get('user', 'UserController@getAuthenticatedUser')->middleware('jwt.verify');

Route::group(['middleware' => 'jwt.verify'], function () {
    //get route
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::get('alluser', 'UserController@getAllUser');
    Route::get('user/{id}', 'UserController@getSpecifiedById');
    Route::get('absen/{id}', 'absenController@getSpecifiedById');
    Route::get('karyawan/{nik}', 'karyawanController@getSpecifiedById');
    Route::get('gaji/{id}', 'gajiController@getGajibyId');
    Route::get('allKaryawan', 'karyawanController@getAllKaryawan');
    Route::get('getGaji', 'gajiController@getGaji');

    //post route
    #user
    Route::post('deleteuser', 'UserController@deleteUser');
    Route::post('register', 'UserController@register');
    Route::post('edituser', 'UserController@editUser');

    #absen
    Route::post('deleteabsen', 'absenController@deleteAbsen');
    Route::post('editabsen', 'absenController@editAbsen');

    #karyawan
    Route::post('inputKaryawan', 'karyawanController@inputKaryawan');
    Route::post('deleteKaryawan', 'karyawanController@deleteKaryawan');
    Route::post('editKaryawan', 'karyawanController@editKaryawan');
    Route::post('searchKaryawan', 'karyawanController@searchKaryawan');

    #gaji
    Route::post('inputGaji', 'gajiController@inputGaji');
    Route::post('deleteGaji', 'gajiController@deleteGaji');
    Route::post('editGaji', 'gajiController@editGaji');
});
