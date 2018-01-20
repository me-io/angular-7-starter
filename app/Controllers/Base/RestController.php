<?php
declare(strict_types=1);

namespace App\Controllers\Base;

use Meabed\Mongoose\Method;
use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;

class RestController
{

    /** @var string */
    protected $modelClass = null;

    /** @var string */
    protected $connectionName = 'mongodb';

    /** @var Method */
    protected $model = null;

    /** @var ContainerInterface */
    protected $container = null;

    /**
     * @var Response
     */
    private $response;
    /** @var Request */
    private $request;

    // constructor receives container instance
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->request = $this->container['request'];
        $this->response = $this->container['response'];


        $this->model = new $this->modelClass();
    }

    /**
     * @return static
     * @throws \Exception
     */
    public function getAll()
    {
        $rs = $this->model->find();
        return $this->response->withJson($rs);
    }

    public function get()
    {
        $r = $this->model->findOne(['created_by' => 'Mohamed']);
        var_dump($r);
    }

    /**
     * @return array|\MongoDB\Driver\Cursor
     * @throws \Exception
     */
    public function count()
    {
        $rs = $this->model->count();
        return $this->response->withJson($rs);
    }

    /**
     * @throws \Exception
     */
    public function insert()
    {
        $rs = $this->model->insert($this->request->getParsedBody());
        return $rs;
    }

    public function update()
    {
        $r = $this->model->update(['created_by' => 'Mohamed'], ['$set' => ['y' => 3]]);

    }

    public function delete()
    {
        $r = $this->model->deleteOne(['created_by' => 'Mohamed']);

    }
//
//    /**
//     * Return list of users
//     *
//     * @return Response
//     */
//    public function index(): Response
//    {
//        if (!$users = $this->userRepository->index()) {
//            return $this->apiResponse->error('Users not found', 'List of user is not available or not exists', 404, $users);
//        }
//
//        $data = $this->userTransformer->collection($users);
//
//        return $this->apiResponse->success($data);
//    }
//
//    /**
//     * Get a specific User
//     *
//     * @param int $id
//     *
//     * @return Response
//     */
//    public function show(int $id): Response
//    {
//        if (!$user = $this->userRepository->show($id)) {
//            return $this->apiResponse->error('User not found', 'The user is not available or not exists', 404, $user);
//        }
//
//        $data = $this->userTransformer->item($user);
//
//        return $this->apiResponse->success($data);
//    }
//
//    /**
//     * Add a new User
//     *
//     * @param Request $request
//     * @param StoreUserValidator $validator
//     * @param UserService $userService
//     *
//     * @return Response
//     */
//    public function store(Request $request, StoreUserValidator $validator, UserService $userService): Response
//    {
//        if (!$validator->validate()) {
//            return $this->apiResponse->errorValidation($validator->errors());
//        }
//
//        if (!$user = $userService->store($request->getParams())) {
//            return $this->apiResponse->error('User not created', 'The user has not been created', 500, $user);
//        }
//
//        $data = $this->userTransformer->item($user);
//
//        return $this->apiResponse->success($data, 201);
//    }
//
//    /**
//     * Update user data
//     *
//     * @param int $id
//     * @param Request $request
//     * @param UpdateUserValidator $validator
//     * @param UserService $userService
//     *
//     * @return Response
//     */
//    public function update(int $id, Request $request, UpdateUserValidator $validator, UserService $userService): Response
//    {
//        if (!$validator->validate()) {
//            return $this->apiResponse->errorValidation($validator->errors());
//        }
//
//        if (!$user = $userService->update($id, $request->getParams())) {
//            return $this->apiResponse->error('User not updated', 'The user not exists or has not been updated', 500, $user);
//        }
//
//        return $this->apiResponse->success('User updated');
//    }
//
//    /**
//     * Delete User
//     *
//     * @param int $id
//     *
//     * @return Response
//     */
//    public function delete(int $id): Response
//    {
//        if (!$user = $this->userRepository->delete($id)) {
//            return $this->apiResponse->error('User not deleted', 'The user not exists or has not been deleted', 500, $user);
//        }
//
//        return $this->apiResponse->success('User deleted');
//    }
}