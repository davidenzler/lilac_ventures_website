interface SearchQuery {
    customer: string,
    price: string,
    invoice: string
}

interface NewInvoiceQuery {
    collection_method: ['send_invoice'],
    auto_advance: false,
    currency: 'usd',
    customer: string,
    status: ['draft'],
    due_date: string,
}

interface SearchInvoice {
    id: string
}


export async function createInvoiceItem(item:any, accessToken:any) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/customerBilling/createInvoiceItem`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    let searchQuery: SearchQuery = {
        'customer': item.customer,
        'price': item.price,
        'invoice': item.invoice
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

export async function createInvoice(invoice:any, accessToken:any) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/customerBilling/createInvoice`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    let query: NewInvoiceQuery = {
        'collection_method': invoice.collection_method,
        'auto_advance': invoice.auto_advance,
        'currency': 'usd',
        'customer': invoice.customer,
        'status': invoice.status,
        'due_date': invoice.due_date
    };

    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: headers,
            body: JSON.stringify(query),
        });
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}

export async function getInvoice(invoice:any, accessToken:any) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/customerBilling/getInvoice`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    let query: SearchInvoice = {
        'id': invoice
    };

    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: headers,
            body: JSON.stringify(query),
        });
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}

export async function deleteDraftInvoice(invoice:any, accessToken:any) {
    const baseURL = process.env.REACT_APP_API_URL;
    console.log("delete invoice: ", invoice);
    console.log("accessToken: ", accessToken);
    const url = `${baseURL}/customerBilling/deleteDraftInvoice`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    let query: SearchInvoice = {
        'id': invoice
    };

    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: headers,
            body: JSON.stringify(query),
        });
        console.log("resposnse: ", response);
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}

export async function finalizeInvoice(invoice:any, accessToken:any) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/customerBilling/finalizeInvoice`
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    let query: SearchInvoice = {
        'id': invoice
    };

    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: headers,
            body: JSON.stringify(query),
        });
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}

export async function getCustomerinvoices(accessToken: string) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/customerBilling/getInvoiceCustomer`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: headers,
        });
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}