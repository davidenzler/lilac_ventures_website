interface SearchQuery {
    name: string
}

export async function searchProducts(productName: string, accessToken:string) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/customerBilling/searchProductsSubstring`;
    console.log("searching for: ", productName);
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }

    let searchQuery: SearchQuery = {
        'name': productName,
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