<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Base\BaseMongoModel;
use App\Util\Helpers\Password;

/**
 * Class UserModel
 * @property string $email
 * @property string $password
 * @property string $createdAt
 * @property string $updateAt
 * @package App\Models
 */
class UserModel extends BaseMongoModel
{
    /** @var string */
    protected $collectionNAme = 'users';

    /** @var array */
    protected $rules = [
        'email' => ['required', 'email'],
        'password' => ['required', ['lengthMin', 6]],
    ];

    /**
     * @return bool|string
     */
    public function _beforeInsert()
    {
        $this->password = Password::hash($this->password);
        return parent::_beforeInsert();
    }
}
