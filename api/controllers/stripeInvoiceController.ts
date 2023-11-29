const decode = require('jwt-decode')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken') 

/**
 * type Invoice = {
 *  description: string
 *  hosted_invoice_url: string,
 *  customer_id: string,
 *  collection_method: [charge_automatically, send_invoice],
 *  total: int,
 * 
 * }
 */

const createInvoice = async (req, res) => {
    const { auto_advance, currency, customer, due_date, collection_method, days_until_due} = req.body;
    let transformed_date;
    const ptTimzoneOffset = 480;
    if(due_date) {
        const dateConversion = new Date(due_date);
        const offsetSeconds = dateConversion.getTimezoneOffset() * 60;
        transformed_date = (dateConversion.getTime()) / 1000 + offsetSeconds;
    } else {
        const days = days_until_due * 86400; // 86400 === seconds per day
        const dateConversion = new Date();
        const offsetSeconds = dateConversion.getTimezoneOffset() * 60;
        const unix_date = (dateConversion.getTime()) / 1000 + offsetSeconds;
        transformed_date = Math.trunc(unix_date + days) 
    }

    try {
        const invoiceResponse = await stripe.invoices.create({
            customer: customer,
            auto_advance: auto_advance,
            collection_method: collection_method,
            currency: currency,
            due_date: transformed_date
        });
        return res.json({invoiceResponse});
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            return res.sendStatus(400);
        } else if (error.type === 'StripeAuthenticationError') {
            return res.sendStatus(500);
        }
        else {
            return res.sendStatus(500);
        }
    }

};


const createInvoiceItem = async (req, res) => {
    const { customer, price, description, invoice } = req.body;
    try {
        const invoiceItemResponse = await stripe.invoiceItems.create({
            customer: customer,
            price: price,
            description: description,
            currency: 'usd',
            invoice: invoice
        });
        return res.json({invoiceItemResponse});
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            return res.sendStatus(400);
        } else if (error.type === 'StripeAuthenticationError') {
            return res.sendStatus(500);
        }
        else {
            return res.sendStatus(500);
        }
    }
};

const searchProductSubstring = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.sendStatus(400);
    var clean = sanitize(name);
    const search_query = `name~"${clean}"`;

    try {
        const searchResults = await stripe.products.search({
            query: search_query 
        });
        if(searchResults.data.length < 1) return res.status(404).json({'message': 'Customer not found.'});
        let productList = [];
        for( let product in searchResults.data) {
            productList[product] = {
                name: searchResults.data[product].name,
                description: searchResults.data[product].email,
                id: searchResults.data[product].id,
                price: searchResults.data[product].default_price
            }
        }
        return res.json({ productList });
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            return res.sendStatus(400);
        } else if (error.type === 'StripeAuthenticationError') {
            return res.sendStatus(500);
        }
        else {
            return res.sendStatus(500);
        }
    }
}


const finalizeInvoice = async(req, res) => {
    const { id } =  req.body;
    try {
        const finalizeResponse = await stripe.invoices.finalizeInvoice(
            id
        );
        return res.sendStatus(200);
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            return res.sendStatus(400);
        } else if (error.type === 'StripeAuthenticationError') {
            return res.sendStatus(500);
        }
        else {
            return res.sendStatus(500);
        }
    }
};

const getInvoice = async(req, res) => {
    const { id } = req.body;
    try {
        const invoiceResponse = await stripe.invoices.retrieve(
            id
        );

        return res.json(invoiceResponse);
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            return res.sendStatus(400);
        } else if (error.type === 'StripeAuthenticationError') {
            return res.sendStatus(500);
        }
        else {
            return res.sendStatus(500);
        }
    }
}

function selectFewerAttributes(invoice) {
    const { subtotal, due_date,  hosted_invoice_url, invoice_pdf } = invoice;
    return { subtotal, due_date,  hosted_invoice_url, invoice_pdf }
}

const getInvoiceCustomer = async(req, res) => {
    var user = req.user;
    try {
        const customerQueryResponse = await stripe.customers.search({
            query: `email:'${user}'`
        });
        const data = customerQueryResponse['data'];
        const customerId = data[0].id;
        const invoiceQueryResponse = await stripe.invoices.search({
            query: `customer:'${customerId}'`
        });
        const invoiceList = invoiceQueryResponse['data'];
        var finalizedInvoices = invoiceList.filter((invoice) => {
            return invoice.status === 'open';
        });
        finalizedInvoices = Array.from(finalizedInvoices);
        var response_body = finalizedInvoices.map(selectFewerAttributes);
        return res.json(response_body);
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            console.log("Whoopsies something went terribel awry");
            return res.sendStatus(400);
        } else if (error.type === 'StripeAuthenticationError') {
            return res.sendStatus(500);
        }
        else {
            return res.sendStatus(500);
        }
    }
}

const deleteDraftInvoice = async(req, res) => {
    const { id } = req.body;
    try{
        const deleted = await stripe.invoices.del(
            id
        );
        return res.sendStatus(200);
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            return res.sendStatus(400);
        } else if (error.type === 'StripeAuthenticationError') {
            return res.sendStatus(500);
        }
        else {
            return res.sendStatus(500);
        }
    }
}

module.exports = {
    createInvoice,
    createInvoiceItem,
    finalizeInvoice,
    searchProductSubstring,
    getInvoice,
    getInvoiceCustomer,
    deleteDraftInvoice
}