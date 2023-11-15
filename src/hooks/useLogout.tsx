import axios from "../api/axios";
import useAuth  from "./useAuth";

const useLogout = () => {
    const{setAuth, setPersist}: any = useAuth();

    const logout = async() => {
        setAuth({
            user: null,
            roles: null, 
            accessToken: null, 
        });

        setPersist(false);
        try {
            await axios('/logout', {
                withCredentials: true
            });
            localStorage.clear()
        }
        catch(err){
            console.error(err);
        }

    }

    return logout;
}

export default useLogout;