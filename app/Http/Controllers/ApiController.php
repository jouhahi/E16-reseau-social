<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ApiController extends Controller
{
    //Fonction qui permet d'afficher la documentation de l'API
    public function index()
    {
        return view('api/index');
    }
}
