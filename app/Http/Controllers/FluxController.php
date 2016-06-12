<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class FluxController extends Controller
{
    
    //Toutes les pages où l'on doit être connecté doivent implémenter le middleware auth.
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('flux');
    }
}
