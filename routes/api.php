<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserAddress;
use App\Http\Controllers\UserAppointmentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('users', UserController::class);

Route::resource('addresses', AddressController::class);

Route::resource('appointments', AppointmentController::class);

Route::resource('transactions', TransactionController::class);

Route::post('/add_appointment', [UserAppointmentController::class, 'add_appointment']);

Route::get('/userAppointments/{user_id}', [AppointmentController::class, 'userAppointments']);

Route::get('userLatestAppointment/{user_id}', [AppointmentController::class, 'userLatestAppointment']);

// Tüm adresleri getir
Route::get('/user_addresses', [UserAddress::class, 'allAddresses']);

// Belirli bir kullanıcının adreslerini getir
Route::get('/user_addresses/{user_id}', [UserAddress::class, 'addresses']);

Route::post('/updateUser/{user_id}', [ProfileController::class, 'updateUser']);

Route::get('/totalUserCount', [UserController::class, 'totalUserCount']);

Route::get('/debug-log', function () {
    if (!app()->environment('local')) {
        abort(403, 'Yasak');
    }

    $logPath = storage_path('logs/laravel.log');

    if (!File::exists($logPath)) {
        return 'Log dosyası yok.';
    }

    return nl2br(e(File::get($logPath)));
});
