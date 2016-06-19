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

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        User::create([
            'prenom' => 'Snoop',
            'nom' => 'Dogg',
            'adresse'=> '420 rue de la montagne',
            'ville' => 'Montréal',
            'province' => 'Québec',
            'code_postal'=>'A1A 1A1',
            'email'=>'test@test.com',
            'password'=>bcrypt('123456')
        ]);

        foreach(range(1,9) as $index)
        {
            User::create([
                'prenom' => $faker->firstName,
                'nom' => $faker->lastName,
                'adresse'=> $faker->streetAddress,
                'ville' => $faker->city,
                'province' => $faker->country,
                'code_postal'=>$faker->postcode,
                'email'=>$faker->email,
                'password'=>bcrypt($faker->password(6,10))

            ]);
        }


    }
}