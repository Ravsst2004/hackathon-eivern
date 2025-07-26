<?php

namespace App\Http\Middleware;

use App\Enums\Roles;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next , ...$roles): Response
    {
        $user = Auth::user();

        if (!$user || !$user->role) {
            abort(403, 'Unauthorized.');
        }

        // SuperAdmin bisa bypass semua
        if ($user->role->nama === Roles::SUPER_ADMIN->value) {
            return $next($request);
        }

        if (in_array($user->role->nama, $roles)) {
            return $next($request);
        }

        abort(403, 'Unauthorized.');
    }
}
