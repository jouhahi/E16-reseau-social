<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\User;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ApiUserController extends Controller
{
    /*
     * Constructeur qui force à utiliser Oauth
     */
    public function __construct()
    {
        $this->middleware('oauth');
        $this->middleware('oauth-user');
    }

    /*
     * Fonction qui permet de retourner l'utilisateur identifié par son code d'API
     *
     */
    public function index()
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
            return Response::json(
                [
                    'id' => $user['id'],
                    'courriel'=>$user['email'],
                    'url-photo-profil'=>$user['url_photo_profil'],
                    'nom'=>$user['nom'],
                    'prenom'=>$user['prenom'],
                    'adresse'=>$user['adresse'],
                    'ville'=>$user['ville'],
                    'province'=>$user['province'],
                    'codepostal'=>$user['code_postal']
                ]
            ,200);
        }
    }


    /*
     * Fonction qui permet de retourner les amis de l'utilisateur
     * identifié par son code d'API
     */
    public function friends()
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

            $amis = $user->getFriends();

            //Vérifier si l'utilisateur a des amis
            if (!$amis || $amis->isEmpty())
            {
                //Aucun ami
                return Response::json([], 204);
            }
            else
            {
                //L'utilisateur a au moins un ami

                return Response::json(
                        $this->transformAmis($amis)
                    ,200);
            }

        }

    }

    /*
     * Fonction pour choisir les champs d'un ami
     * Provient de Laracast #4
     * https://laracasts.com/series/incremental-api-development
     */
    private function transformAmis($user)
    {
        return array_map(function($user)
        {
            return[
                'id' => $user['id'],
                'courriel'=>$user['email'],
                'url-photo-profil'=>$user['url_photo_profil'],
                'nom'=>$user['nom'],
                'prenom'=>$user['prenom']
            ];
        }, $user->all());
    }
}
