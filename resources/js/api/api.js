const BASE_API='http://localhost:8000/api';

const API_CONSTANT_MAP = {
    "login": `${BASE_API}/login`,
    "register":`${BASE_API}/register`,
    "cekToken": `${BASE_API}/user`,
    "allUser": `${BASE_API}/alluser`,
    "deleteUser" : `${BASE_API}/deleteuser`,
    "getSpecified" : `${BASE_API}/user/`,
    "editUser" : `${BASE_API}/edituser`
}

module.exports=API_CONSTANT_MAP;
