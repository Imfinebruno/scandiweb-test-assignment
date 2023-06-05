<?php

    namespace App\Models;

    use App\Database\Connection;

    class Product
    {   
        private static $table = 'product';

        public static function select(int $id)
        {
            $connPdo = Connection::getInstance();
            
            $sql = 'SELECT * FROM '.self::$table.' WHERE id = :id';
            $stmt = $connPdo->prepare($sql);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            if($stmt->rowCount() > 0){
                return $stmt->fetch(\PDO::FETCH_ASSOC);
            } else {
                throw new \Exception('Product doesn`t exist!');
            }
        }

        public static function selectAll()
        {   
            $connPdo = Connection::getInstance();
            $sql = 'SELECT * FROM '.self::$table;

            $stmt = $connPdo->prepare($sql);
            $stmt->execute();

            if($stmt->rowCount() > 0){
                return $stmt->fetchAll(\PDO::FETCH_ASSOC);
            } else {
                throw new \Exception('No products found!');
            }
        }

        public static function insert($data)
        {
            $connPdo = Connection::getInstance();

            $sql = 'INSERT INTO '.self::$table.' (sku, name, price, size, weight, dimensions) values (:sku, :name, :price, :size, :weight, :dimensions)';
            $stmt = $connPdo->prepare($sql);

            $stmt->bindValue(':sku', $data['sku']);
            $stmt->bindValue(':name', $data['name']);
            $stmt->bindValue(':price', $data['price']);
            $stmt->bindValue(':size', $data['size']);
            $stmt->bindValue(':weight', $data['weight']);
            $stmt->bindValue(':dimensions', $data['dimensions']);
            
            $stmt->execute();

            if($stmt->rowCount() > 0){
                return 'Product successfully added!';
            } else {
                throw new \Exception('Failed to insert product!');
            }
        }
        public static function delete(int $id)
        {
            // $connPdo = new \PDO(DB_DRIVE.': host='.DB_HOST.'; dbname='.DB_NAME, DB_USER, DB_PASS);
            $connPdo = Connection::getInstance();
            
            $sql = 'DELETE FROM '.self::$table.' WHERE id = :id';
            $stmt = $connPdo->prepare($sql);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            if($stmt->rowCount() > 0){
                return $stmt->fetch(\PDO::FETCH_ASSOC);
            } else {
                throw new \Exception('Failed to delete product!');
            }
        }
    }