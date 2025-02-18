<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $addresses = Address::all();
        return response()->json($addresses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'address_name' => 'required|string|max:255',
            'address_line_1' => 'required|string',
            'user_id' => 'required|exists:users,id'
        ]);

        // Nominatim API isteği
        $response = Http::withHeaders([
            'User-Agent' => 'EcoOil/1.0 (a.hakan.cansizz@email.com)' // Zorunlu header
        ])->get('https://nominatim.openstreetmap.org/search', [
            'q' => $validated['address_line_1'],
            'format' => 'json',
            'limit' => 1,
            'addressdetails' => 1
        ]);

        $data = $response->json();

        if (!empty($data) && isset($data[0]['lat']) && isset($data[0]['lon'])) {
            $validated['latitude'] = (float)$data[0]['lat'];
            $validated['longitude'] = (float)$data[0]['lon'];
        } else {
            // Hata durumu
            $validated['latitude'] = null;
            $validated['longitude'] = null;
        }

        $address = Address::create($validated);

        return response()->json([
            'message' => 'Address created successfully',
            'data' => $address
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        $address->delete();
    }
}
