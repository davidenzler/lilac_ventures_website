import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";

interface AuthData {
    accessToken: string | null;
}

interface AuthHooks {
    auth: AuthData;
    persist: boolean;
}

const PersistentLogin: React.FC = () => {
    const [isLoading, setisLoading] = useState(true);
    const ref = useRefreshToken();
    const { auth, persist } = useAuth() as AuthHooks; 

    useEffect(() => {
        let isMounted = true;

        const verifyRefToken = async () => {
            try {
                await ref();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setisLoading(false);
            }
        }

        !auth?.accessToken && persist ? verifyRefToken() : setisLoading(false);

        return () => { isMounted = false; };
    }, [auth?.accessToken, persist, ref]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading, auth?.accessToken]);

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    );
}

export default PersistentLogin;