import {useContext} from "react";
import AuthContext from "../login-components/context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw Error('useAuthContext muse be used in AuthContextProvider');
    }

    return context;
}

export default useAuth;