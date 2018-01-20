<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Controllers\Base\RestController;
use App\Models\UserModel;

class UserController extends RestController
{
    protected $modelClass = UserModel::class;

    public function mex()
    {

    }
}
