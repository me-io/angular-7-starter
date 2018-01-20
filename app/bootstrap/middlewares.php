<?php

$app->add(function (\Slim\Http\Request $request, \Slim\Http\Response $response, $next) {
    $response = $next($request, $response);
    return $response;
});

$app->add(new \Slim\Middleware\JwtAuthentication([
    "path" => "/api",
    'passthrough' => [
        '/api/user/register',
        '/api/user/login',
        '/api/ping'
    ],
    'secret' => 'supersecretkeyyoushouldnotcommittogithub',
    'error' => function ($request, $response, $arguments) {
        throw new Exception($arguments["message"], 401);
    }

]));
