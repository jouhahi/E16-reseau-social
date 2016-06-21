<?php

/**
 * Created by PhpStorm.
 * User: Joey
 * Date: 2016-06-19
 * Time: 12:40
 *
 * Classe qui permet de créer 10 utilisateur aléatoire + 1 utilisateur de test
 */

use App\Ticket;
use App\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class TicketsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $userIds = User::lists('id')->all();
        
        //dd($userIds);
        
        foreach(range(1,30) as $index)
        {
            Ticket::create([
                'uuid'=>$faker->uuid,
                'titre'=>$faker->word,
                'lieu'=>$faker->address,
                'date'=>$faker->dateTimeBetween('-1 weeks', '+2 weeks'),
                'artiste'=>$faker->name,
                'montant'=>$faker->numberBetween(0,50),
                'user_id'=> $faker->randomElement($userIds)
            ]);
        }


    }
}