const stripe = require('stripe')(process.env.STRIPE_KEY)
var sanitize = require('mongo-sanitize');
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
            console.log("Invalid parameters supplied. Please check parameters");
        } else if (error.type === 'StripeAuthenticationError') {
            console.log('Error with API key. Please try again');
        }
        else {
            console.log('Unknown error: ', error)
        }
        return res.sendStatus(400);
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
            console.log("Invalid parameters supplied. Please check parameters");
        } else if (error.type === 'StripeAuthenticationError') {
            console.log('Error with API key. Please try again');
        }
        else {
            console.log('Unknown error: ', error)
        }

        return res.status(400);
    }
};

const searchProductSubstring = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400);
    var clean = sanitize(name);
    const search_query = `name~"${clean}"`;

    try {
        const searchResults = await stripe.products.search({
            query: search_query 
        });
        if(searchResults.data.length < 1) return res.status(404).json([]);
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
            console.log("Invalid parameters supplied. Please check parameters");
        } else if (error.type === 'StripeAuthenticationError') {
            res.status(400).json({'message': 'Error with API key. Please try again'});
        }
        else {
            console.log('Unknown error: ', error)
        }
    }
}


const finalizeInvoice = async(req, res) => {
    const { id } = req.body;

    try {
        const finalizeResponse = await stripe.invoices.finalizeInvoice(
            id
        );
        return res.sendStatus(200);
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            console.log("Invalid parameters supplied. Please check parameters");
        } else if (error.type === 'StripeAuthenticationError') {
            console.log('Error with API key. Please try again');
        }
        else {
            console.log('Unknown error: ', error)
        }
    }
};

const getInvoice = async(req, res) => {
    const { id } = req.body;
    console.log("ID: ",id);
    try {
        const invoiceResponse = await stripe.invoices.retrieve(
            id
        );

        return res.json(invoiceResponse);
    } catch (error) {
        if(error.type === 'StripeInvalidRequestError') {
            console.log("Invalid parameters supplied. Please check parameters");
        } else if (error.type === 'StripeAuthenticationError') {
            console.log('Error with API key. Please try again');
        }
        else {
            console.log('Unknown error: ', error)
        }
    }
}

module.exports = {
    createInvoice,
    createInvoiceItem,
    finalizeInvoice,
    searchProductSubstring,
    getInvoice
}