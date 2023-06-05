<?php

    namespace App\Services;

    use App\Models\Product;

    class ProductService
    {
        public function GET($id = null)
        {
            if($id){
                return Product::select($id);
            }else{
                return Product::selectAll();
            }
        }
        public function POST()
        {   
            $data = json_decode(file_get_contents('php://input'), true);
    
            try {
                $response = Product::insert($data);
                return json_encode(array('message' => $response));
            } catch (\Exception $e) {
                return json_encode(array('error' => $e->getMessage()));
            }
        }
        public function UPDATE()
        {
            
        }
        public function DELETE($id = null)
        {
            return Product::delete($id);
        }
    }