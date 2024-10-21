<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserAddress;
use App\Http\Controllers\UserAppointmentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('users', UserController::class);

Route::resource('addresses', AddressController::class);

Route::resource('appointments', AppointmentController::class);

Route::resource('transactions', TransactionController::class);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/user_appointments/{user_id}', [UserAppointmentController::class, 'user_appointments']);
Route::post('/add_appointment', [UserAppointmentController::class, 'add_appointment']);

Route::get('/user_addresses/{user_id}', [UserAddress::class, 'addresses']);
