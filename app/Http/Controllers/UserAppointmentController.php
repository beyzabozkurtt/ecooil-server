<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
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

        $appointment = Appointment::create($request->all());
        return response()->json($appointment);
    }

}
