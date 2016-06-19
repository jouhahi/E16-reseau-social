<?php
/**
 * Created by PhpStorm.
 * User: Joey
 * Date: 2016-06-19
 * Time: 13:25
 */

namespace App;


class Ticket extends \Eloquent
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'uuid', 'titre', 'lieu', 'date', 'artiste', 'monstant', 'user_id'
    ];

}
