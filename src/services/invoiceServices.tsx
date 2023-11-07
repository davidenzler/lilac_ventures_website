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


export async function createInvoiceItem(item:any) {
    const url = 'http://localhost:8080/customerBilling/createInvoiceItem';
    let searchQuery: SearchQuery = {
        'customer': item.customer,
        'price': item.price,
        'invoice': item.invoice
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

export async function createInvoice(invoice:any) {
    const url = 'http://localhost:8080/customerBilling/createInvoice';
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(query),
        });
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}

export async function getInvoice(invoice:any) {
    const url = 'http://localhost:8080/customerBilling/getInvoice';
    let query: SearchInvoice = {
        'id': invoice
    };

    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(query),
        });
        return response;
    } catch(err) {
        console.log("ERROR: ", err);
        return err;
    }
}