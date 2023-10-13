import useAuth from "../hooks/useAuth";


export async function logout() {
    try {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            credentials: "include"
        })
        const test = await response.json()
        console.log(test);
        return test;
    } catch(err) {
        return [];
    }
}