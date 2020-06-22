const BASE_API=`/api`;

const API_CONSTANT_MAP = {
    "login": `${BASE_API}/login`,
    "register":`${BASE_API}/register`,
    "cekToken": `${BASE_API}/user`,
    "allUser": `${BASE_API}/alluser`,
    "deleteUser" : `${BASE_API}/deleteuser`,
    "getSpecified" : `${BASE_API}/user/`,
    "editUser" : `${BASE_API}/edituser`,
    "getAllAbsen" : `${BASE_API}/getAllAbsen`,
    "deleteAbsen" : `${BASE_API}/deleteabsen`,
    "getAbsenbyId" : `${BASE_API}/absen/`,
    "editAbsen" : `${BASE_API}/editabsen`,
    "getAllKaryawan" : `${BASE_API}/allKaryawan`,
    "inputKaryawan" : `${BASE_API}/inputKaryawan`,
    "deleteKaryawan" : `${BASE_API}/deleteKaryawan`,
    "getKaryawanbyId" : `${BASE_API}/karyawan/`,
    "editKaryawan" : `${BASE_API}/editKaryawan/`,
    "getGaji" : `${BASE_API}/getGaji`,
    "searchKaryawan" : `${BASE_API}/searchKaryawan`,
    "inputGaji" : `${BASE_API}/inputGaji`,
    "deleteGaji" : `${BASE_API}/deleteGaji`,
    "getGajibyId" : `${BASE_API}/gaji/`,
    "editGaji" : `${BASE_API}/editGaji`,
}

module.exports=API_CONSTANT_MAP;
