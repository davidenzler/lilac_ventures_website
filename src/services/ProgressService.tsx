export async function getUsersAtStep(step: number) {
    try {
        const response = await fetch('http://localhost:8080/customerProgress/getCustomersAtStep', {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"stepNum": step})
        })
        const test = await response.json()
        console.log(test);
        return test;
    } catch(err) {
        return [];
    }
}