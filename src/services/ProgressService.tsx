export async function getUsersAtStep(step: number) {
    const baseURL = process.env.REACT_APP_API_URL;
    try {
        const response = await fetch(`${baseURL}/customerProgress/getCustomersAtStep`, {
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