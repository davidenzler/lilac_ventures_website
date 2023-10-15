import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const ProtectedUserRoute = (children: any) => {
    const {auth} : any= useAuth();
    const location = useLocation();
    const roles = auth.roles;

    console.log("ROLES ", roles);

    if( !roles) {
        console.log("hmmm, you don't appear to be logged in");
        return (
            <Navigate to="/login" />
        )
    }
    if( roles === 'user') {
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