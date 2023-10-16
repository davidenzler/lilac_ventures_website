import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    user: null,
    roles: null, 
    accessToken: null, 
  });

  const persistedValue = localStorage.getItem("persist");
  const initialPersist = persistedValue ? JSON.parse(persistedValue) : false;
  const [persist, setPersist] = useState(initialPersist);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;