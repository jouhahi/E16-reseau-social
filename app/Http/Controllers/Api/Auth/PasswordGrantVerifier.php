<?php
/**
 * Created by PhpStorm.
 * User: Joey
 * Date: 2016-06-20
 * Time: 11:03
 * La classe provient de https://github.com/lucadegasperi/oauth2-server-laravel/blob/master/docs/authorization-server/password.md
 * 
 */
namespace App\Http\Controllers\Api\Auth;

use Illuminate\Support\Facades\Auth;

class PasswordGrantVerifier
{
    /**
     * Fonction qui vérifie que l'utilisateur est valide lors de
     * l'authentification Oauth avec mot de passe pour l'application
     * mobile.
     *
     * @param $username
     * @param $password
     * @return bool
     */
    public function verify($username, $password)
    {
        $credentials = [
            'email'    => $username,
            'password' => $password,
        ];

        if (Auth::once($credentials)) {
            return Auth::user()->id;
        }

        return false;
    }
}