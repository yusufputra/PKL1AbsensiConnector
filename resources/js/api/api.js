const BASE_API='http://localhost:8000/api';

const API_CONSTANT_MAP = {
    "login": `${BASE_API}/login`,
    "register":`${BASE_API}/daftar`,
    "cekToken": `${BASE_API}/user`
}

module.exports=API_CONSTANT_MAP;
