<?php

/**
 * Created by PhpStorm.
 * User: Joey
 * Date: 2016-06-19
 * Time: 12:40
 *
 * Classe qui permet de créer 10 utilisateur aléatoire + 1 utilisateur de test
 */

use App\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class FriendshipTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        
        //Prendre le user #1
        $utilisateur1 = User::findOrFail(1);


        //Donner 5 amis au premier utilisateur
        foreach(range(1,5) as $index)
        {
            $utilisateur2 = User::findOrFail($index+1);

            $utilisateur1->befriend($utilisateur2);

            $utilisateur2->acceptFriendRequest($utilisateur1);

        }
        
    }
}