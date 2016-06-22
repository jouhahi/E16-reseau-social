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
use Carbon\Carbon;

class OauthClientsTableSeeder extends Seeder
{
    public function run()
    {
        $carbon = Carbon::now();
        //Ajout des informations pour le client oauth de l'application mobile
        DB::table('oauth_clients')->insert([
            'id' => 'f3d259ddd3ed8ff3843839b',
            'secret' => '4c7f6f8fa93d59c45502c0ae8c4a95b',
            'name'=> 'Application mobile',
            'created_at'=>$carbon,
            'updated_at'=>$carbon
        ]);

        //Ajout des informations pour le client oauth du site de vente de billets
        DB::table('oauth_clients')->insert([
            'id' => '32k4h34jk2h34kj2h34kj2jk',
            'secret' => '45kjh36kvjhnk54vvhj3kj64j6h3jk4g2k',
            'name'=> 'Ticket-fire',
            'created_at'=>$carbon,
            'updated_at'=>$carbon
        ]);

        DB::table('oauth_client_endpoints')->insert([
        'client_id' => '32k4h34jk2h34kj2h34kj2jk',
        'redirect_uri' => 'https://ticket-fire.herokuapp.com/federation',
        'created_at'=>$carbon,
        'updated_at'=>$carbon
    ]);

    }
}