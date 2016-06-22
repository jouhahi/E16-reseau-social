<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table){
            $table->increments('id');
            $table->string('uuid')->unique();
            $table->string('titre');
            $table->string('lieu');
            $table->dateTime('date');
            $table->string('artiste');
            $table->string('montant');
            $table->integer('user_id')->unsigned();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign('user_id');
        });
 
        Schema::drop('tickets');

    }
}
