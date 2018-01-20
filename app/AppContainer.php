<?php

namespace App;

use Slim\App;

class AppContainer
{
    /** @var App */
    private static $app = null;

    /**
     * @param array $settings
     * @return null|App
     */
    public static function getInstance($settings = [])
    {
        if (null === self::$app) {
            self::$app = self::makeInstance($settings);
        }

        return self::$app;
    }

    /**
     * @param array $settings
     * @return App
     */
    private static function makeInstance($settings = [])
    {
        $app = new App($settings);
        // do all logic for adding routes etc
        return $app;
    }
}
