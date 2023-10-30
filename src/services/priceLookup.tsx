interface SearchQuery {
    id: string
}

export async function priceLookup(priceId: string) {
    const url = 'http://localhost:8080/customerBilling/priceLookup';
    let searchQuery: SearchQuery = {
        'id': priceId,
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