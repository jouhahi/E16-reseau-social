<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\User;

class ApiUserController extends Controller
{
    /*
     * Fonction qui permet de retourner l'utilisateur identifié par son code d'API
     *
     */
    public function index()
    {
        $id = 1;

        $user = User::find($id);

        if(!$user)
        {
            return Response::json([
                'error'=> 'missing_token',
                'error_description'=>'La requête n’a pas de jeton'
            ], 400);
        }
        else
        {
            return Response::json(
                $this->transform($user)
            ,200);
        }
    }

    private function transform($object)
    {
        return[
            'id' => $object['id'],
            'courriel'=>$object['email'],
            'url-photo-profil'=>$object['url_photo_profil'],
            'nom'=>$object['nom'],
            'prenom'=>$object['prenom'],
            'adresse'=>$object['adresse'],
            'ville'=>$object['ville'],
            'province'=>$object['province'],
            'codepostal'=>$object['code_postal']
        ];
    }
}
