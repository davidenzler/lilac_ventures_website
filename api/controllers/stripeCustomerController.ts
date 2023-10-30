const stripe = require('stripe')(process.env.STRIPE_KEY)

/**
type Customer = {
    description: string,
    phone: string,
    firstName: string,
    lastName: string,
    email: string,
    address: {
        city: string,
        postal_code: string,
        country: string,
        line1: string,
        line2: string,
        state: string,
    }
};
*/
const createCustomer = async (req, res) => {
    
    const customer = req.body;

    if( !customer.phone || !customer.email || !customer.firstName || !customer.lastName) return res.status(400).json({'message': 'Missing required inputs.'});
    try{
        const newCustomerResponse = await stripe.customers.create({
            description: customer.description ? customer.description : "",
            email: customer.email,
            phone: customer.phone,
            name: customer.firstName + " " + customer.lastName,
            address: customer.address ? customer.address : "",
        });


        // customer created successfully
        return res.status(200).json({ 'message': 'Customer created' });
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

const retrieveCustomer = async (req, res) => {
    const { id } = req.body;
    if( !id ) return res.status(400).json({'message': 'missing id'})

    try {
        const customer = await stripe.customers.retrieve( id );
        return;
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


const searchCustomers = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({'message': 'missing required input: email'});
    const search_query = `email:'${email}'`;
    try {
        const searchResults = await stripe.customers.search({
            query: search_query 
        });
        if(searchResults.data.length < 1) return res.status(404).json({'message': 'Customer not found.'});

        if(searchResults.data.length > 1) return res.status(400).json({'Message': 'Multiple Customers returned. Please try query again'});
        return res.json({ "id": searchResults.data[0].id});
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


const searchCustomersSubstring = async (req, res) => {
    const { email, customer } = req.body;
    if (!email && !customer) return res.status(400);
    let search_param;
    !email ? search_param = 'name' : search_param = 'email';
    let query;
    !email ? query = customer : query = email;
    const search_query = `${search_param}~"${query}"`;

    try {
        const searchResults = await stripe.customers.search({
            query: search_query 
        });
        if(searchResults.data.length < 1) return res.status(404).json({'message': 'Customer not found.'});
        let customerList = [];
        for( let custie in searchResults.data) {
            customerList[custie] = {
                name: searchResults.data[custie].name,
                email: searchResults.data[custie].email,
                id: searchResults.data[custie].id,
            }
        }
        return res.json({ customerList });
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


const deleteCustomer = async (req, res) => {
    const { id } = req.body;
    if ( !id ) return res.status(400).json({ "message": "missing required inputs" });
    try {
        const deleted = await stripe.customers.del(
            id
        );

        if( !deleted ) return res.status(404).json({"message": "Customer not found"});

        return res.json({ "message": "customer deleted" });
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
};


module.exports = { 
    createCustomer,
    searchCustomers,
    searchCustomersSubstring
 }