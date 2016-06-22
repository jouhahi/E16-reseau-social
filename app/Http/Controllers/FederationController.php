<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Http\Requests;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class FederationController extends Controller
{
    
    /*
     * Fonction pour afficher le formulaire de connexion à la fédération
     * Provient de:
     * https://github.com/lucadegasperi/oauth2-server-laravel/blob/master/docs/authorization-server/auth-code.md
     */
    public function index()
    {
        $authParams = Authorizer::getAuthCodeRequestParams();

        $formParams = array_except($authParams,'client');

        $formParams['client_id'] = $authParams['client']->getId();

        $formParams['scope'] = implode(config('oauth2.scope_delimiter'), array_map(function ($scope) {
            return $scope->getId();
        }, $authParams['scopes']));

        $nom =  Auth::user()->nom;
        $prenom =  Auth::user()->prenom;
        
        
        return View::make('federation.federation', ['params' => $formParams, 'client' => $authParams['client'], 'user'=>$prenom.$nom]);
    }

    /*
     * Fonction pour valider le formulaire de connexion à la fédération
     * Provient de:
     * https://github.com/lucadegasperi/oauth2-server-laravel/blob/master/docs/authorization-server/auth-code.md
     */
    public function submit()
    {
        $params = Authorizer::getAuthCodeRequestParams();
        $params['user_id'] = Auth::user()->id;
        $redirectUri = '/';

        // If the user has allowed the client to access its data, redirect back to the client with an auth code.
        if (Request::has('approve')) {
            $redirectUri = Authorizer::issueAuthCode('user', $params['user_id'], $params);
        }

        // If the user has denied the client to access its data, redirect back to the client with an error message.
        if (Request::has('deny')) {
            $redirectUri = Authorizer::authCodeRequestDeniedRedirectUri();
        }

        return Redirect::to($redirectUri);
    }
}
