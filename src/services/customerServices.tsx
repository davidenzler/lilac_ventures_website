const sanitinze = require('mongo-sanitize');

interface SearchQuery {
    email: string
    customer: string
}

interface Customer {
    phone: string,
    email: string,
    firstName: string,
    lastName: string
}

export async function searchCustomers(search: string, accessToken: string) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/customerBilling/searchCustomersSubstring`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    let searchQuery: SearchQuery = {
        'email': "",
        'customer': ""
    };
    const customer = sanitinze(search);
    const RE = new RegExp('@');
    RE.test(customer) ? searchQuery['email'] = customer : searchQuery['customer'] = customer;

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

export async function addNewCustomer(customer: Customer, accessToken: string) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/customerBilling/createCustomer`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    const searchQuery = sanitinze(customer);
    
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