import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {auth}: any = useAuth();

    const refresh = async() => {
        const resp = await axios.get('/refresh', {
            withCredentials: true
        });
        auth((prev: any) => {
            console.log(JSON.stringify(prev));
            console.log(resp.data.accessToken);
            return {...prev, roles: resp.data.roles, accessToken: resp.data.accessToken}
        });
        return resp.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;