<?php
/**
 * Created by PhpStorm.
 * User: Joey
 * Date: 2016-06-22
 * Time: 15:45
 * Provient de http://stackoverflow.com/questions/28402726/laravel-5-redirect-to-https
 * Par: manix
 */

namespace App\Http\Middleware;

use Closure;

class HttpsProtocol {

    public function handle($request, Closure $next)
    {
        if (!$request->secure() && env('APP_ENV') === 'prod') {
            return redirect()->secure($request->getRequestUri());
        }

        return $next($request);
    }
}