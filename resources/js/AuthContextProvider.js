import React, { useEffect, useState, createContext } from "react";
import Axios from "axios";
import api from "./api/api";

export const UserContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState({});

    const [verified, setverified] = useState(false);
    useEffect(() => {
        const checking = async () => {
            await Axios.get(api.cekToken, {
                headers: {
                    Authorization: "Bearer " + localStorage.token
                }
            })
                .then(ress => {
                    console.log(ress);
                    if (
                        ress.data.status != "Token is Invalid" ||
                        ress.data.status != "Token is Expired" ||
                        ress.data.status != "Authorization Token not found"
                    ) {
                        setverified(true);
                        setUser(ress.data.user);
                    } else {
                        alert(ress.data.status);
                        localStorage.clear();
                    }
                })
                .catch(error => {
                    console.log(error);
                    localStorage.clear();
                });
        };
        if (localStorage.token != null && verified == false) {
            console.log("checked");
            checking();
        }
    });
    return (
        <UserContext.Provider value={{ user, verified }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default AuthContextProvider;
