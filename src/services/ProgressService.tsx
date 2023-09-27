export async function getUsersAtStep(step: number) {
    try {
        const response = await fetch('http://localhost:8080/getProgress', {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"stepNum": step})
        })
        return await response.json();
    } catch(err) {
        return [];
    }
}