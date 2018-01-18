<?php

session_start();

$container = $app->getContainer();

$container['config'] = function () use ($container) {
    $settings = $container['settings'];

    $func = function ($key, $defaultValue = null) use ($settings) {
        return $settings[$key] ?? $defaultValue;
    };

    return $func;
};

/** @var () $getConfig */
$getConfig = $container['config'];

$container['renderer'] = function () use ($getConfig) {
    $config = $getConfig('renderer');

    return new Slim\Views\PhpRenderer($config['template_path']);
};


$container['response'] = function () {
    return new \App\Responses\ApiResponse();
};

$container['logger'] = function () use ($getConfig) {
    $config = $getConfig('logger');
    $logger = new \Monolog\Logger($config['name']);
    $file = new \Monolog\Handler\RotatingFileHandler($config['path'], $config['level']);
    $logger->pushHandler($file);

    return $logger;
};

$container['errorHandler'] = function (\Slim\Container $container) use ($getConfig) {

    return function ($request, \App\Responses\ApiResponse $response, $exception) use ($container) {

        $getConfig = $container['config'];
        $config = $getConfig('logger');

        if ($exception instanceof App\Exceptions\GenericException) {
            return $response->error($exception->getTitle(), $exception->getDetails(), $exception->getStatus());
        }

        if ($exception instanceof App\Exceptions\JWTException) {
            $response = new \App\Responses\ApiResponse();

            return $response->error($exception->getTitle(), $exception->getMessage(), 500);
        }

        // Add custom error here

        $uuid = \Ramsey\Uuid\Uuid::uuid1();

        /** @var \Exception $exception */
        $container->get('logger')->addError($exception->getMessage(), [
            'uuid' => $uuid->toString(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString(),
        ]);

        return $response->error('Something went wrong', ($config['DEBUG'] === '1') ? $exception->getMessage() : 'Contact the admin', 500, [], $uuid);
    };
};

$container['notFoundHandler'] = function ($c) {

    return function (\Slim\Http\Request $request, $response) use ($c) {
        return $response->error('Page not found', "This page at the moment doesn't exists", 404);

    };
};

$container['notAllowedHandler'] = function ($c) {

    return function (\Slim\Http\Request $request, $response, $methods) use ($c) {
        return $response->error('Method not allowed', "Sorry but this method is not available for this resource", 405, ['Method allowed for this endpoint are: ' . implode(', ', $methods)]);

    };
};

$container['phpErrorHandler'] = function (\Slim\Container $container) {
    return $container->get('errorHandler');
};

$container['validator'] = function (\Slim\Container $container) {
    $request = $container->get('request');

    return new Valitron\Validator($request->getParsedBody(), [], 'en');
};

$container['jwt'] = function (\Slim\Container $container) use ($getConfig) {
    $config = $getConfig('logger');

    $config = [
        'header-param' => $config['JWT_HEADER_PARAMS'],
        'issuer' => $config['JWT_ISSUER'],
        'audience' => $config['JWT_AUDIENCE'],
        'id' => $config['JWT_ID'],
        'sign' => $config['JWT_SIGN'],
    ];

    return new App\Acme\JWT\JWT($container->get('request'), new Lcobucci\JWT\Builder(), new \Lcobucci\JWT\Signer\Hmac\Sha256(), new \Lcobucci\JWT\Parser(), new \Lcobucci\JWT\ValidationData(), $config);
};

$container['authService'] = function (\Slim\Container $container) {
    $jwt = $container->get('jwt');
    $userRepository = $container->get('userRepository');

    return new \App\Services\AuthService($userRepository, $jwt);
};

$container['db'] = function () use ($getConfig) {
    $config = $getConfig('db');

    $connection = new Illuminate\Database\Capsule\Manager();
    $connection->addConnection([
        'driver' => 'mysql',
        'host' => $config['DB_HOST'] ?: 'localhost',
        'database' => $config['DB_NAME'] ?: 'db',
        'username' => $config['DB_USER'] ?: 'root',
        'password' => $config['DB_PASSWORD'] ?: 'root',
        'charset' => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix' => '',
        'unix_socket' => $config['DB_UNIX_SOCKET'] ?: null,
    ]);

    $connection->setAsGlobal();
    $connection->bootEloquent();

    return $connection->getConnection();
};

$container['mailer'] = function () use ($getConfig) {
    $config = $getConfig('logger');

    return \App\Acme\Helpers\Mailer::fromArray([
        'host' => $config['SMTP_HOST'],
        'port' => $config['SMTP_PORT'],
        'encryption' => $config['SMTP_ENCRYPTION'],
        'username' => $config['SMTP_USERNAME'],
        'password' => $config['SMTP_PASSWORD'],
        'name' => $config['SMTP_NAME'],
    ]);
};

$container['gmailMailer'] = function () {
    $config = explode(PHP_EOL, file_get_contents(__DIR__ . '/../../.gmail'));

    return \App\Acme\Helpers\Mailer::fromArray([
        'host' => 'smtp.gmail.com',
        'port' => '465',
        'encryption' => 'ssl',
        'username' => $config[0],
        'password' => $config[1],
        'name' => 'Email Server',
    ]);
};

$container['flash'] = function () {
    return new \Slim\Flash\Messages();
};

$container['userRepository'] = function () {
    return new App\Repositories\Users\UserEloquentRepository(new \App\Models\User());
};

