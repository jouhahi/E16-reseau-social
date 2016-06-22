<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::group(['middleware' => 'https'], function () {
    
    Route::get('/', function () {
        return view('index');
    });

    // Routes pour l'API
    Route::group(['prefix' => 'api'], function()
    {
        Route::get('/','Api\ApiController@index');

        //Route pour afficher le profil de l'utilsateur authentifié
        Route::get('utilisateur', 'Api\ApiUserController@index');

        //Route pour afficher les amis de l'utilisateur authentifié
        Route::get('utilisateur/amis', 'Api\ApiUserController@friends');

        //Route pour afficher les billets de l'utilisateur authentifié
        Route::get('utilisateur/billets', 'Api\ApiTicketController@userTickets');

        //Route pour créer des nouveaux billets
        Route::post('utilisateur/billets', 'Api\ApiTicketController@addNewTickets');

        //Route pour afficher les billets des amis de l'utilisateur authentifié
        Route::get('utilisateur/amis/billets', 'Api\ApiTicketController@friendsTickets');

        // Route pour authentifier les utilisateurs de l'application mobile
        Route::post('jetons/mobile', function() {
            return Response::json(Authorizer::issueAccessToken());
        });

        // Route pour authentifier les utilisateurs de la fédération
        Route::post('jetons/federation', function() {
            return Response::json(Authorizer::issueAccessToken());
        });
    });

    //Route pour l'affichage du formulaire de connexion de la fédération
    Route::get('federation', ['as' => 'oauth.authorize.get', 'middleware' => ['check-authorization-params', 'auth'], 'uses' =>'FederationController@index']);

    //Route pour la validation du formulaire d'autorisation de la fédération
    Route::post('federation', ['as' => 'oauth.authorize.post', 'middleware' => ['csrf', 'check-authorization-params', 'auth'],'uses' =>'FederationController@submit']);

    // Routes pour l'authentification
    Route::get('connexion', ['as' => 'auth.login', 'uses' => 'Auth\AuthController@showLoginForm']);
    Route::post('connexion', ['as' => 'auth.login', 'uses' => 'Auth\AuthController@login']);
    Route::get('deconnexion', ['as' => 'auth.logout', 'uses' => 'Auth\AuthController@logout']);

    // Routes pour l'enregistrement
    Route::get('inscription', ['as' => 'auth.register', 'uses' => 'Auth\AuthController@showRegistrationForm']);
    Route::post('inscription', ['as' => 'auth.register', 'uses' => 'Auth\AuthController@register']);

    // Routes pour la réinitialisation de mots de passe
    Route::get('password/reset/{token?}', ['as' => 'auth.password.reset', 'uses' => 'Auth\PasswordController@showResetForm']);
    Route::post('password/email', ['as' => 'auth.password.email', 'uses' => 'Auth\PasswordController@sendResetLinkEmail']);
    Route::post('password/reset', ['as' => 'auth.password.reset', 'uses' => 'Auth\PasswordController@reset']);


    // Route pour l'affichage du flux
    Route::get('/flux', 'FluxController@index');

});