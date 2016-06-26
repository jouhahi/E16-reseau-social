<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Auth;


class ProfilController extends Controller
{

    //Toutes les pages où l'on doit être connecté doivent implémenter le middleware auth.
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showProfile()
    {
        $user = Auth::id();
        $profil = User::find($user);

        return view('profil',['user' => $profil]);
    }

    
}
