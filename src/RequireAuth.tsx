import React from 'react';
import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = (allowedRoles: any) => {
    const {auth} : any= useAuth();
    const location =useLocation();

    return (
        auth?.roles?.find((role:any) => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user 
                ? <Navigate to = "/" state = {{from: location}} replace/>
                : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth;