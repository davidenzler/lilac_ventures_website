interface SearchQuery {
    email: string
    customer: string
}

export async function searchCustomers(customer: string) {
    const url = 'http://localhost:8080/customerBilling/searchCustomersSubstring';
    let searchQuery: SearchQuery = {
        'email': "",
        'customer': ""
    };

    const RE = new RegExp('@');
    RE.test(customer) ? searchQuery['email'] = customer : searchQuery['customer'] = customer;

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