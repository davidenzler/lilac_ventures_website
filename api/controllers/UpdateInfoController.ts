const Client = require('../model/Client.ts');

//Get List of Clients
const getClients = async (req, res) => {
    try {
        let clients = [];
        clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Add a new Client
const addClient = async (req, res) =>{
    let client = new Client(req.body);
    console.log(client);
    client.save()
    .then(game => {
       // res.status(200).json({"client": "Client Added Successfully"});
    })
    .catch(err => {
        
        res.status(400).send("Something Went Wrong");
    })
    res.status(200).json({"client": "Client Added Successfully"});

};

//Get Client details according to ID
const getDetails = async(req, res) =>{
    let id = req.params.id;
    Client.findById(id, function(err, Client){
        res.json(Client);
    })
};

const getDetailsFromEmail = async (req, res) => {
    try {
        const { clientEmail } = req.params;
        const foundUser = await Client.findOne({ email: clientEmail }).exec();
        if (!foundUser) {
            console.log(`user with email ${clientEmail} not found.`);
            return res.status(401).json({ error: 'User not found' });
        }

        res.status(200).json({ client: foundUser });
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
    

};

//Update Client Details
const updateClient = async(req, res) =>{
    Client.findById(req.params.id, function(err, Client){
        if(!Client)
            res.status(400).send("No Client was found under that id.")
        else{
            Client.firstName = req.body.firstName;
            Client.lastName = req.body.lastName;
            Client.email = req.body.email;
            Client.phone = req.body.phone;
            Client.address = req.body.adress;
            Client.contactPreference = req.body.contactPreference;

            Client.save().then(emp => {
                res.json("Client Updated Successfully");
            })
            .catch(err => {
                res.staus(400).send("Unable to Update Client");
            })
        }
    })
};

//Delete Client
const deleteClient = async(req, res) =>{
   Client.findByIdAndRemove({_id:req.params.id}, function(err, Client){
    if(err) res.json(err);
    else res.json("Employee Deleted Succesfully");

   });
};

const searchClients = async(req, res) => {
    const { email, customer} = req.body;
    let queryResponse;
    if(!customer) {
        queryResponse = await Client.find({ "email": { "$regex": `${email}`, "$options": "i" }});
    } else {
        queryResponse = await Client.find({"firstname": {"$regex": `${customer}`}})
    }
    let responseData = [];
    console.log("response: ", queryResponse);
    if(queryResponse.length > 0) {
        for (const client in queryResponse) {
            const clientInfo = queryResponse[client];
            responseData[client] = {
                "firstname": clientInfo.firstname,
                "lastname": clientInfo.lastName,
                "emaill": clientInfo.email
            }
        }
    } else {
        return res.sendStatus(404);
    }

    return res.json({responseData});
}
module.exports = {
    getClients,
    addClient,
    getDetails,
    getDetailsFromEmail,
    updateClient,
    deleteClient,
    searchClients
}