const Client = require('../models/Client');

//Get List of Clients
const getClients = async (req, res) => {
    Client.find(function(err, Client){
        if(err){
            console.log(err);
        } else{
            res.json(Client)
        }
    })
};

//Add a new Client
const addClient = async (req, res) =>{
    let client = new Client(req.body);
    client.save()
    .then(game => {
        res.status(200).json({"client": "Client Added Successfully"});
    })
    .catch(err => {
        res.status(400).send("Something Went Wrong");
    })

};

//Get Client details according to ID
const getDetails = async(req, res) =>{
    let id = req.params.id;
    Client.findById(id, function(err, Client){
        res.json(Client);
    })
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

module.exports = {
    getClients,
    addClient,
    getDetails,
    updateClient,
    deleteClient
}