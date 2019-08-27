<?php
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'AuthController@login')->name('login');
Route::post('/register', 'AuthController@register')->name('register');
Route::post('/logout', 'AuthController@logout')->name('logout')->middleware('auth:api');
Route::post('/closesessions', 'AuthController@closeSessions')->name('closesessions')->middleware('auth:api');

Route::post('/items/get', 'ItemController@get');
Route::post('/items/add', 'ItemController@add')->middleware('auth:api');
Route::post('/items/delete', 'ItemController@delete')->middleware('auth:api');

Route::post('/cart/add', 'CartController@add')->middleware('auth:api');
Route::post('/cart/delete', 'CartController@delete')->middleware('auth:api');
Route::post('/cart/decrement', 'CartController@decrement')->middleware('auth:api');
Route::post('/cart/clear', 'CartController@clear')->middleware('auth:api');