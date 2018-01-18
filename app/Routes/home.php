<?php
// homepage
$app->get('/', function ($request, $response) use ($container) {
    /** @var \Slim\Views\PhpRenderer $renderer */
    $renderer = $container['renderer'];
    return $renderer->render($response, 'pages/index.phtml', [
        'title' => 'Home'
    ]);
});
