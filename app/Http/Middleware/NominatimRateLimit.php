<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class NominatimRateLimit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(Request): (Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $executed = RateLimiter::attempt(
            'nominatim:'.$request->ip(),
            $perMinute = 1, // Dakikada 1 istek
            function() {}
        );

        if (!$executed) {
            return response()->json([
                'message' => 'Too many requests. Please try again later.'
            ], 429);
        }

        return $next($request);
    }
}
