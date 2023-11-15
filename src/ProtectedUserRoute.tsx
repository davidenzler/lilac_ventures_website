import React from 'react';
import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const ProtectedUserRoute = (children: any) => {
    const {auth} : any= useAuth();
    const location = useLocation();
    //const roles = auth ? auth.roles : null;

    // temp fix
    const roles = auth ? auth.accessToken : null; 

    if( !roles) {
        console.log("hmmm, you don't appear to be logged in");
        return (
            <Navigate to="/login" />
        )
    }
    if( roles ) {
        return(
            <Outlet />
        );
    } else {
        console.log("hmmm, you don't appear to be an authorized viewer of this site in");
        return (
            <Navigate to="/login" />
        );
    }
}

export default ProtectedUserRoute;