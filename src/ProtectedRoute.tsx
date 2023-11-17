import React from 'react';
import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const ProtectedRoute = ({permittedRole}:any) => {
    const {auth} : any= useAuth();
    const location = useLocation();

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

export default ProtectedRoute;