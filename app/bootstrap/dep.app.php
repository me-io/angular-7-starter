<?php

$container['mongodb'] = function (\Slim\Container $container) use ($getConfig) {
    $config = $getConfig('mongodb');

    $connection = new \App\Util\Db\MongoManager($container);
    $connection->addConnection([
        'uri' => $config['uri'],
        'database' => $config['database'],
        'uriOptions' => $config['uriOptions'],
        'driverOptions' => $config['driverOptions'],
    ]);

    return $connection->getConnection();
};

$container['mailer'] = function () use ($getConfig) {
    $config = $getConfig('logger');

    return \App\Util\Helpers\Mailer::fromArray([
        'host' => $config['SMTP_HOST'],
        'port' => $config['SMTP_PORT'],
        'encryption' => $config['SMTP_ENCRYPTION'],
        'username' => $config['SMTP_USERNAME'],
        'password' => $config['SMTP_PASSWORD'],
        'name' => $config['SMTP_NAME'],
    ]);
};
