export async function getAllUsers() {
    try{
        const response = await fetch('http://127.0.0.1:8080/list_users');
        return await response.json();
    } catch(error) {
        alert(error);
        return [];
    }
}