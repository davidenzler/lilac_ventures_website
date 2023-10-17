import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth }: any = useAuth();

    const refresh = async () => {
        try {
            const resp = await axios.get('/refresh', {
                withCredentials: true
            });
            
            auth.accessToken = resp.data.accessToken; // Update the accessToken property
            auth.roles = resp.data.roles; // Update the roles property

            console.log(JSON.stringify(auth)); // Log the updated auth object
            
        } catch (error) {
            console.error(error);
            throw error; // Re-throw the error if necessary
        }
    }

    return refresh;
};

export default useRefreshToken;