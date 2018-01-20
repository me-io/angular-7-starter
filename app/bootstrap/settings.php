<?php
return [
    'settings' => [
        'mongodb' => [
            'uri' => 'mongodb://localhost:27017',
            'database' => 'phonebook',
            'uriOptions' => [],
            'driverOptions' => []
        ],
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header
        //Monolog settings
        'logger' => [
            'DEBUG' => 1, // set to false in production
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ]
];
