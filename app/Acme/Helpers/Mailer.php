<?php

declare(strict_types=1);

namespace App\Acme\Helpers;

use App\Exceptions\GenericException;
use Swift_Mailer;
use Swift_Message;
use Swift_SmtpTransport;

class Mailer
{
    /**
     * @var string
     */
    private $host;
    /**
     * @var string
     */
    private $port;
    /**
     * @var string
     */
    private $encryption;
    /**
     * @var string
     */
    private $username;
    /**
     * @var string
     */
    private $password;
    /**
     * @var string
     */
    private $name;

    /**
     * Mailer constructor.
     *
     * @param string $host
     * @param string $port
     * @param string $encryption
     * @param string $username
     * @param string $password
     * @param string $name
     */
    public function __construct(string $host, string $port, string $encryption, string $username, string $password, string $name)
    {
        $this->host       = $host;
        $this->port       = $port;
        $this->encryption = $encryption;
        $this->username   = $username;
        $this->password   = $password;
        $this->name       = $name;
    }

    /**
     * Return a Mailer from an array
     *
     * @param array $smtp
     *
     * @return Mailer
     */
    public static function fromArray(array $smtp): self
    {
        return new self(
            $smtp['host'],
            $smtp['port'],
            $smtp['encryption'],
            $smtp['username'],
            $smtp['password'],
            $smtp['name']
        );
    }

    /**
     * Send an email
     *
     * @param       $subject
     * @param array $to
     * @param array $cc
     * @param       $body
     *
     * @return void
     *
     * @throws \App\Exceptions\GenericException
     */
    public function send($subject, array $to, array $cc, $body)
    {
        $transport = new Swift_SmtpTransport($this->host, $this->port, $this->encryption);
        $transport->setUsername($this->username)
                  ->setPassword($this->password);

        $mailer = new Swift_Mailer($transport);

        $message = new Swift_Message($subject);
        $message->setFrom([$this->username => $this->name])
                ->setTo($to)
                ->setCc($cc)
                ->setBody($body, 'text/html');

        if ($mailer->send($message) === 0) {
            throw new GenericException('Email not sent', '', 500);
        }
    }
}
