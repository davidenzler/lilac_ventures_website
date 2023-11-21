import React, { useEffect } from 'react';
import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const ProtectedRoute = ({permittedRole}:any) => {
    const {auth, persist} : any = useAuth();
    const location = useLocation();
    if(persist === true) {
        const loggedInAuth = localStorage.getItem("auth");
        console.log("AUTHENTICATION LOCAL STORAGE", loggedInAuth);
        if(!loggedInAuth) {
            return (
                <Navigate to="/login" />
            )
        }
        const authObj = JSON.parse(loggedInAuth);
        if(authObj.roles === permittedRole) {
            return(
                <Outlet />
            );
        } else {
            return (
                <Navigate to="/login" />
            );
        }
    } else {
        if( !auth.roles) {
            return (
                <Navigate to="/login" />
            )
        }
        if( auth.roles === permittedRole) {
            return(
                <Outlet />
            );
        } else {
            return (
                <Navigate to="/login" />
            );
        }
    }
}

export default ProtectedRoute;