<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\IsBem;
use App\Http\Middleware\IsKemahasiswaan;
use App\Http\Middleware\IsMahasiswa;
use App\Http\Middleware\IsOrmawa;
use App\Http\Middleware\IsSuperAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);
        // $middleware->validateCsrfTokens(
        //     except: [
        //         '/export-sertifikat',
        //     ],
        // );

        $middleware->alias([
            'isBem' => IsBem::class,
            'isKemahasiswaan' => IsKemahasiswaan::class,
            'isOrmawa' => IsOrmawa::class,
            'isSuperAdmin' => IsSuperAdmin::class,
            'isMahasiswa' => IsMahasiswa::class
        ]);
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        
    })->create();
