<?php   
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated',
                'success' => false
            ], 401);
        }

        if (!$user->hasAnyRole($roles)) {
            return response()->json([
                'message' => 'Forbidden - Insufficient permissions',
                'success' => false
            ], 403);
        }

        return $next($request);
    }
}