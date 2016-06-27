<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Ticket;
use Auth;
use DateTime;


class SpectaclesController extends Controller
{

    //Toutes les pages où l'on doit être connecté doivent implémenter le middleware auth.
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function showTous()
    {
        $user = Auth::id();

        $spectacles = Ticket::where('user_id',$user)
                            ->orderBy('date','desc')
                            ->get();

        return view('spectacle-tous',['spectacles' => $spectacles]);

    }


    public function showFutur()
    {
        $user = Auth::id();


        $spectacles = Ticket::where('user_id',$user)
            ->where('date','>',new DateTime('today'))
            ->orderBy('date','asc')
            ->get();

        return view('spectacle-futur',['spectacles' => $spectacles]);
    }

    
}
