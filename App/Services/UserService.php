<?php

    namespace App\Services;

    use App\Models\User;

    class UserService
    {
        public function GET($id = null)
        {
            if($id){
                return User::select($id);
            }else{
                return User::selectAll();
            }
        }
        public function POST()
        {   
            $data = $_POST;

            return User::insert($data);
        }
        public function UPDATE()
        {
            
        }
        public function DELETE()
        {
            
        }
    }