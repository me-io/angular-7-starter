<?php

namespace App\Util\Db;

use Psr\Container\ContainerInterface;

class MongoManager
{
    const MONGO_DI = 'mongodb';
    const MONGO_CONFIG_CONNECTION = 'mongo.database.connections';
    protected $config = [];
    protected $container = [];
    protected static $instances = [];

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * Register a connection with the manager.
     *
     * @param  array $config
     * @param  string $name
     * @return void
     */
    public function addConnection(array $config, $name = 'default')
    {
        $connections = $this->container[self::MONGO_CONFIG_CONNECTION] ?? [];

        $connections[$name] = $config;

        $this->container[self::MONGO_CONFIG_CONNECTION] = function () use ($connections) {
            return $connections;
        };
    }

    public function getConnection($name = 'default')
    {
        if (isset(self::$instances[$name])) {
            return self::$instances[$name];
        }
        $config = $this->container[self::MONGO_CONFIG_CONNECTION][$name];

        $manager = new \MongoDB\Driver\Manager($config['uri'], $config['uriOptions'], $config['driverOptions']);
        self::$instances[$name] = $manager;

        return self::$instances[$name];

    }
}