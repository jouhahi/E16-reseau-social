<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Ticket;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        Ticket::truncate();
        Eloquent::unguard();

        $this->call('UsersTableSeeder');
        $this->call('TicketsTableSeeder');
        $this->call('FriendshipTableSeeder');


    }
}
