<?php
/** @var \Slim\App $this */

// get user from jwt
$this->get('/user/me', \App\Controllers\UserController::class . ":me");

// user login
$this->map(['POST'], '/user/login', \App\Controllers\UserController::class . ":login");

// register | insert
$this->map(['POST'], '/user/register', \App\Controllers\UserController::class . ":insert");

### REST API
// list all users
$this->get('/users', \App\Controllers\UserController::class . ":getAll");
// get count all users
$this->get('/users/count', \App\Controllers\UserController::class . ":count");

// get user by id
$this->get('/user/{id:[0-9]+}', \App\Controllers\UserController::class . ":get");
// update user by id
$this->put('/user/{id:[0-9]+}', \App\Controllers\UserController::class . "update");
// delete user by id
$this->delete('/user/{id:[0-9]+}', \App\Controllers\UserController::class . ":delete");