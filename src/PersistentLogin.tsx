import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";

const PersistentLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { setAuth, persist }: any = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        if (persist) {
            verifyRefToken();
        } else {
            setIsLoading(false); // Set isLoading to false if persist is false
        }
    }, [refresh, persist]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(setAuth?.accessToken)}`);
    }, [isLoading, setAuth?.accessToken]);

    return (
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    );
};

export default PersistentLogin;