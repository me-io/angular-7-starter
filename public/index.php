<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

$settings = require __DIR__ . '/../app/bootstrap/settings.php';

$app = new \Slim\App($settings);

$container = $app->getContainer();
/** @var \Slim\Http\Request $request */
$request = $container['request'];
/** @var \Slim\Http\Uri $uri */
$uri = $request->getUri();

define('__ROOTURL__', $request->getServerParam('HTTP_REFERER'));
define('__ROOTURI__', $uri->getBasePath());
define('__PATH__', $uri->getPath());
define('__APPDIR__', __DIR__);

define('__ISAPI__', (bool)stristr($uri->getPath(), '/api/'));

$settings = require __DIR__ . '/../app/bootstrap/dependencies.php';

$routes = glob(__DIR__ . '/../app/Routes/*.php');
foreach ($routes as $route) {
    require $route;
}

try {
    $app->run();
} catch (\Exception $e) {
    var_dump($e);
}
