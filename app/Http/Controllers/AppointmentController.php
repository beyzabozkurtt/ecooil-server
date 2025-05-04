<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Transaction;
use GuzzleHttp\Psr7\Response;
use http\Client\Curl\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appointments = Appointment::all();
        return response()->json($appointments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        return response()->json($appointment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
    }

    public function userAppointments($user_id): JsonResponse
    {
        $user = \App\Models\User::find($user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if ($user->role == 'collector') {
            $transactions = Transaction::where('user_id', $user_id)->get();
            $transaction_ids = $transactions->pluck('appointment_id')->toArray();

            $appointments = Appointment::query()->with('address')->where('customer_id', $user_id)->whereNotIn('id', $transaction_ids)->get();

            return response()->json($appointments);
        }

        // filter if appointment id is in transactions
        $transactions = Transaction::where('user_id', $user_id)->get();
        $transaction_ids = $transactions->pluck('appointment_id')->toArray();

        $appointments = Appointment::query()->with('address')->where('customer_id', $user_id)->whereNotIn('id', $transaction_ids)->get();

        return response()->json($appointments);
    }

    public function userLatestAppointment($user_id): JsonResponse
    {
        $user = \App\Models\User::find($user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if ($user->role == 'collector') {
            $appointment = Appointment::where('collector_id', $user_id)->latest()->first();
            return response()->json($appointment);
        }

        // filter if appointment id is in transactions
        $transactions = Transaction::where('user_id', $user_id)->get();
        $transaction_ids = $transactions->pluck('appointment_id')->toArray();

        $appointments = Appointment::query()->with('address')->where('customer_id', $user_id)->whereNotIn('id', $transaction_ids)->get();

//        get latest appointment
        $appointment = Appointment::query()->with('address')->where('customer_id', $user_id)->whereNotIn('id', $transaction_ids)->latest()->first();

//        $appointment = Appointment::query()->with('address')->where('customer_id', $user_id)->latest()->first();
        return response()->json($appointment);
    }
}
