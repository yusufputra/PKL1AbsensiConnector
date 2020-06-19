<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDataKaryawansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_karyawans', function (Blueprint $table) {
            $table->bigInteger("nik");
            $table->string("nama");
            $table->string("nip");
            $table->string("pendidikan");
            $table->string("tempat_lahir");
            $table->string("jenis_kelamin");
            $table->string("alamat");
            $table->string("no_telepon");
            $table->string("agama");
            $table->string("jabatan");
            $table->boolean("status_pegawai");
            $table->timestamps();
            $table->primary("nik");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_karyawans');
    }
}
