<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserAppointmentController extends Controller
{
    public function user_appointments($user_id): JsonResponse
    {
        $appointments = Appointment::where('user_id', $user_id)->get();

        return response()->json($appointments);
    }

    public function add_appointment(Request $request): JsonResponse
    {
        $request->validate([
            'customer_id' => 'required|integer',
            'collector_id' => 'nullable|integer',
            'address_id' => 'required|integer',
            'date' => 'required|date',
            'amount' => 'required|numeric',
        ]);

//        Geçici olarak collector id 12'ye eşitlenecek daha sonra değişecek
        $request->merge(['collector_id' => 12]);

        $appointment = Appointment::create($request->all());
        return response()->json($appointment);
    }

}
