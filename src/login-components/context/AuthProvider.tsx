import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children} : { children: any}) => {
    const [auth, setAuth] = useState({
        user: null,
        roles: null,
        accessToken: null
    });

    console.log('AuthContext state: ', auth);
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;