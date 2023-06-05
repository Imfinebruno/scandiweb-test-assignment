<?php

    namespace App\Database;

    class Connection
    {   
        private static $instance = null;
        
        private function __construct() {}
    
        public static function getInstance()
        {   
            $hostname = DB_HOST;
            $dbname = DB_NAME;
            $username = DB_USER;
            $password = DB_PASS;
            $ssl = '../cacert.pem';

            $options = [
                \PDO::MYSQL_ATTR_SSL_CA => $ssl,
            ];

            if (self::$instance === null) {
                $dsn = "mysql:host=$hostname;port:3306; dbname=$dbname";
                self::$instance = new \PDO($dsn, $username, $password, $options);
                self::$instance->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            }
    
            return self::$instance;
        }
    }