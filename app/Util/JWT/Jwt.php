<?php

declare(strict_types=1);

namespace App\Util\JWT;
class Jwt
{
    const TOKEN_EXPIRY_SECONDS = 300;
    const TOKEN_REGEXP = '[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+';
    const LEEWAY_SECONDS = 15;

    private $secretKey = '';
    private $allowedAlgorithms = [];

    public static function create(): Jwt
    {
        $secretKey = getenv('JWT_SECRET');
        if (!$secretKey) {
            throw new \InvalidArgumentException("No secret key provided.");
        }
        return new self($secretKey);
    }

    public function __construct(string $secretKey, array $allowedAlgorithms = array('HS256'), int $leeway = self::LEEWAY_SECONDS)
    {
        $this->secretKey = $secretKey;
        $this->allowedAlgorithms = $allowedAlgorithms;
        $this->leeway = $leeway;
    }

    public function parseHeader(string $headerValue): \stdClass
    {
        if (!preg_match('/^Bearer (' . self::TOKEN_REGEXP . ')$/', $headerValue, $matches)) {
            throw new \InvalidArgumentException("Malformed header");
        }
        \Firebase\JWT\JWT::$leeway = $this->leeway;
        return \Firebase\JWT\JWT::decode($matches[1], $this->secretKey, $this->allowedAlgorithms);
    }

    public function generateToken($data, int $expirySeconds = self::TOKEN_EXPIRY_SECONDS): string
    {
        $now = time();
        $payload = array(
            "exp" => $now + $expirySeconds,
            "nbf" => $now,
            "data" => $data,
        );
        return \Firebase\JWT\JWT::encode($payload, $this->secretKey);
    }

}
