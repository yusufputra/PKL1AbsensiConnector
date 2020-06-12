<?php

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
// Route::get('user', 'UserController@getAuthenticatedUser')->middleware('jwt.verify');

Route::group(['middleware' => 'jwt.verify'], function () {
    //get route
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::get('alluser','UserController@getAllUser');
    Route::get('user/{id}','UserController@getSpecifiedById');


    //post route
    Route::post('deleteuser', 'UserController@deleteUser');
    Route::post('register', 'UserController@register');
});
