import useAuth from "../hooks/useAuth";

export async function logout() {
    const baseURL = process.env.REACT_APP_API_URL;
    const{setAuth, setPersist}: any = useAuth();
    setAuth({
        user: null,
        roles: null, 
        accessToken: null, 
    });

    setPersist(false);
    try {
        const response = await fetch(`${baseURL}/logout`, {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            credentials: "include"
        })
        
        localStorage.clear()
        const test = await response.json()
        console.log(test);
        return test;
    } catch(err) {
        return [];
    }
}