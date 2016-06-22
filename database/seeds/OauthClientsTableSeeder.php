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

class OauthClientsTableSeeder extends Seeder
{
    public function run()
    {
        //Ajout des informations pour le client oauth de l'application mobile
        DB::table('oauth_clients')->insert([
            'id' => 'f3d259ddd3ed8ff3843839b',
            'secret' => '4c7f6f8fa93d59c45502c0ae8c4a95b',
            'name'=> 'Application mobile',
            'created_at'=>'2015–05–12 21:00:00',
            'updated_at'=>'0000–00–00 00:00:00'
        ]);

        //Ajout des informations pour le client oauth du site de vente de billets
        DB::table('oauth_clients')->insert([
            'id' => '32k4h34jk2h34kj2h34kj2jk',
            'secret' => '45kjh36kvjhnk54vvhj3kj64j6h3jk4g2k',
            'name'=> 'Ticket-fire',
            'created_at'=>'2015–05–12 21:00:00',
            'updated_at'=>'0000–00–00 00:00:00'
        ]);

        DB::table('oauth_client_endpoints')->insert([
        'client_id' => '32k4h34jk2h34kj2h34kj2jk',
        'redirect_uri' => 'https://ticket-fire.herokuapp.com/federation',
        'created_at'=>'2015–05–12 21:00:00',
        'updated_at'=>'0000–00–00 00:00:00'
    ]);

    }
}