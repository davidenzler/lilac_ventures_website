import { log } from "console";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const{auth}: any = useAuth();

    const logout = async() => {
        auth({});
        try{
            const response = await axios('/logout', {withCredentials: true});
        } catch(err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;