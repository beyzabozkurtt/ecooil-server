<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class UserAddress extends Controller
{
    // Belirli bir kullanıcının adreslerini getir
    public function addresses($user_id)
    {
        $addresses = Address::where('user_id', $user_id)->get();
        return response()->json($addresses);
    }

    // Tüm kullanıcıların adreslerini getir (YENİ EKLENDİ)
    public function allAddresses()
    {
        $addresses = Address::all();
        return response()->json($addresses);
    }
}
