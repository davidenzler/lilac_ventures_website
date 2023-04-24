import {useContext} from "react";
import AuthContext from "../login-components/context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;