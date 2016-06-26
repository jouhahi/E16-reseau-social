<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Ticket;
use Auth;


class SpectaclesController extends Controller
{

    //Toutes les pages où l'on doit être connecté doivent implémenter le middleware auth.
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = Auth::id();

        if()
        $spectacles = Ticket::where('user_id',$user)
                        ->orderBy('date','desc')
                        ->get();
        else{

        }

        return view('spectacle-tous',['spectacles' => $spectacles]);
    }

    
}
