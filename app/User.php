<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Hootlex\Friendships\Traits\Friendable;

class User extends Authenticatable
{
    use Friendable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'prenom', 'nom', 'adresse', 'ville', 'province', 'code_postal', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /*
     * Fonction qui permet de retourner facilement la liste de
     * billets appartenants à l'utilisateur
     * Provient de https://laracasts.com/series/laravel-5-from-scratch/episodes/8
     */
    public function tickets()
    {
        return $this->hasMany('App\Ticket');
    }
}
