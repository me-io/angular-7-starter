<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header
        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../Views/',
        ],
        'emailRenderer' => [
            'template_path' => __DIR__ . '/../../_emails/',
        ],
        //Monolog settings
        'logger' => [
            'DEBUG' => true, // set to false in production
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ]
];
