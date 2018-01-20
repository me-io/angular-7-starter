<?php

namespace App\Models\Base;

use App\AppContainer;
use App\Util\Db\MongoManager;
use Meabed\Mongoose\Method;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Driver\Manager;
use Slim\Container;
use Valitron\Validator;

/**
 * Class BaseMongoModel
 * @property string $created_at
 * @property string $update_at
 * @package App\Models\Base
 */
class BaseMongoModel
{
    /** @var Container */
    protected $container = null;

    /** @var string */
    protected $connectionNAme = 'default';

    /** @var Manager */
    protected $mongoManager = null;
    /** @var string */
    protected $databaseName = '';
    /** @var string */
    protected $collectionNAme = '';

    protected $method;

    protected $data = null;

    protected $rules = [];

    /**
     * BaseMongoModel constructor.
     */
    public function __construct()
    {
        $this->container = AppContainer::getInstance()->getContainer();
        $this->mongoManager = $this->container->get(MongoManager::MONGO_DI);
        $config = $this->container[MongoManager::MONGO_CONFIG_CONNECTION][$this->connectionNAme];
        $databaseName = $config['database'];

        $this->method = (new Method())->__setup($this->mongoManager, $databaseName, $this->collectionNAme);
    }


    /**
     * @param $name
     * @param $args
     * @return mixed
     * @throws \Exception
     */
    public function __call($name, $args)
    {
        $shouldValidate = false;
        $shouldBS = false;
        $shouldBU = false;
        $shouldBI = false;
        $setData = false;
        switch ($name) {
            case 'insert':
            case 'insertOne':
                $this->data = $args[0] ?? [];
                $shouldValidate = true;
                $shouldBI = true;
                $shouldBS = true;
                $setData = true;
                break;

            case 'update':
            case 'updateOne':
            case 'updateMany':
                $this->data = $args[0] ?? [];
                $shouldValidate = true;
                $shouldBU = true;
                $shouldBS = true;
                $setData = true;
                break;

            default:
                break;
        }

        if ($shouldValidate) {
            $this->_validate();
        }

        if ($shouldBU) {
            $bU = $this->_beforeInsert();
            if ($bU !== true) {
                throw new \Exception($bU, 400);
            }
        }

        if ($shouldBI) {
            $bI = $this->_beforeInsert();
            if ($bI !== true) {
                throw new \Exception($bI, 400);
            }
        }

        if ($shouldBS) {
            $bS = $this->_beforeSave();
            if ($bS !== true) {
                throw new \Exception($bS, 400);
            }
        }
        if ($setData) {
            $args[0] = $this->data;
        }

        $rs = call_user_func_array([$this->method, $name], $args);
        return $rs;
    }

    /**
     * @param $arr
     * @param string $sep
     * @return string
     */
    public function textErrorFromArr($arr, $sep = "\n")
    {
        $returnMsgArr = [];
        foreach ($arr as $field => $msgArr) {
            foreach ($msgArr as $msg) {
                $returnMsgArr[] = $msg;
            }
        }

        return join($sep, $returnMsgArr);
    }

    /**
     * @throws \Exception
     */
    protected function _validate()
    {
        $v = new Validator($this->data);
        $v->mapFieldsRules($this->rules);
        if ($v->validate()) {
            // valid
        } else {
            $errAsText = $this->textErrorFromArr($v->errors());
            throw new \Exception($errAsText, 400);
        }
    }

    /**
     * @return bool|string
     */
    public function _beforeInsert()
    {
        return true;
    }

    /**
     * @return bool|string
     */
    public function _beforeUpdate()
    {
        return true;
    }

    /**
     * @return bool|string
     */
    public function _beforeSave()
    {
        $this->created_at = $this->created_at ?? new UTCDateTime();
        $this->update_at = new UTCDateTime();
        return true;
    }

    /**
     * @param $offset
     * @return null|mixed
     */
    public function __get($offset)
    {
        if (property_exists($this, $offset)) {
            return $this->{$offset};
        } else {
            return $this->data[$offset] ?? null;
        }
    }

    /**
     * @param $offset
     * @param $value
     * @return $this
     */
    public function __set($offset, $value)
    {
        if (property_exists($this, $offset)) {
            $this->{$offset} = $value;
        } else {
            return $this->data[$offset] = $value;
        }

        return $this;
    }
}