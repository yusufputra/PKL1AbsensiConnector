<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePendapatansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pendapatans', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('nik');
            $table->integer('bulan');
            $table->integer('tahun');
            $table->integer('gaji_pokok');
            $table->integer('bpjs');
            $table->integer('pph21');

            $table->timestamps();

            $table->foreign('nik')->references('nik')->on('data_karyawans');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pendapatans');
    }
}
