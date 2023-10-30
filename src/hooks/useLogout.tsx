import axios from "../api/axios";
import useAuth  from "./useAuth";

const useLogout = () => {
    const{setAuth}: any = useAuth();

    const logout = async() => {
        setAuth({
            user: null,
            roles: null, 
            accessToken: null, 
        });

        try {
            await axios('/logout', {
                withCredentials: true
            });
        }
        catch(err){
            console.error(err);
        }

    }

    return logout;
}

export default useLogout;