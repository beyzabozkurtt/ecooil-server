<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class UserAddress extends Controller
{
    public function addresses($user_id)
    {
        $addresses = Address::where('user_id', $user_id)->get();
        return response()->json($addresses);
    }
}
