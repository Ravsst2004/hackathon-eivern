<?php

namespace App\Http\Middleware;

use Closure;
use App\Enums\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsMahasiswa
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->role->nama === Roles::MAHASISWA->value) {
            return $next($request);
        }

        abort(403, 'Unauthorized.');
    }
}
