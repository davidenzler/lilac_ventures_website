interface SearchQuery {
    user: string,
    pwd: string,
    new_pwd: string
}

export async function reset(user:any, pwd:any, new_pwd:any) {
    const url = 'http://localhost:8080/passwordReset';

    const headers = {
        'Content-Type': 'application/json'
    }

    let searchQuery: SearchQuery = {
        'user': user,
        'pwd': pwd,
        'new_pwd': new_pwd
    };

    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: headers,
            body: JSON.stringify(searchQuery),
        });
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}