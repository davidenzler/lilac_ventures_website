interface SearchQuery {
    name: string
}

export async function searchProducts(productName: string) {
    const url = 'http://localhost:8080/customerBilling/searchProductsSubstring';
    console.log("searching for: ", productName);
    let searchQuery: SearchQuery = {
        'name': productName,
    };

    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(searchQuery),
        });
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}