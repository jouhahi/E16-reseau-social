<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\User;
use App\Ticket;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;


class ApiTicketController extends Controller
{
    /*
    * Constructeur qui force à utiliser Oauth
    */
    public function __construct()
    {
        $this->middleware('oauth');
        $this->middleware('oauth-user');
    }

    public function userTickets()
    {
        $userId = Authorizer::getResourceOwnerId();

        $user = User::find($userId);

        if(!$user)
        {
            return Response::json([
                'error'=> 'not_found',
                'error_description'=>'The token owner is not an existing user.'
            ], 404);
        }
        else
        {
            //Aller chercher tous les billets de l'utilisateur
            $tickets = $user->tickets;

            //TRIER LES BILLETS ET AFFICHER QUE CEUX QUI NE SONT PAS PASSÉS

            //Vérifier si l'utilisateur a des billets
            if (!$tickets || $tickets->isEmpty())
            {
                //Aucun billet
                return Response::json([], 204);
            }
            else
            {
                //L'utilisateur a des billets
                return Response::json(
                    $this->transformTicketsPrivate($tickets)
                    ,200);
            }


        }

    }

    public function friendsTickets()
    {


    }

    public function addNewTickets()
    {

    }

    /*
     * Fonction pour choisir les champs d'un billet
     * Provient de Laracast #4
     * https://laracasts.com/series/incremental-api-development
     */
    private function transformTicketsPrivate($tickets)
    {
        return array_map(function($tickets)
        {
            return[
                'uuid' => $tickets['uuid'],
                'titre'=>$tickets['titre'],
                'artiste'=>$tickets['artiste'],
                'lieu'=>$tickets['lieu'],
                'date'=>$tickets['date'],
                'montant'=>$tickets['montant']
            ];
        }, $tickets->all());
    }
}
