import React from "react";
import axios from "../api/axios";
import useAuth  from "./useAuth";

const Redirect = require('react-router-dom');

const useLogout = () => {
    const{setAuth, setPersist}: any = useAuth();

    const logout = async() => {
        setAuth({
            user: null,
            roles: null, 
            accessToken: null, 
        });
        setPersist(false);
        localStorage.clear()

        try {
            await axios('/logout', {
                withCredentials: true
            });
            <Redirect to='/' />
        }
        catch(err){
            console.error(err);
        }

    }

    return logout;
}

export default useLogout;