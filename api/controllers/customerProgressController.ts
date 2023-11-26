const Client = require('../model/Client.ts');

//Test using a GET request to http://localhost:8080/customerProgress/<#ID>
// Where <#ID> is the id of a user
const getProgress = async (req, res) => {
    try {
        if (!req?.params?.id) return res.status(400).json({ 'message': 'Client ID required.' });

        const user = await Client.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(204).json({ "message": `No Client matches ID ${req.params.id}.` });
        }
        res.json(user);
        //Returns the  progress
        // const userProgress = {
        //     progress: user.progress
        // }
        //res.json(userProgress);

    } catch (error) {
        // Checking for a CastError
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(400).json({ "message": `Invalid Client ID: ${req.params.id}.` });
        }

        // Log the error
        //console.error("Error fetching user progress:", error);
        
        // Return a generic server error message
        res.status(500).json({ "message": "Internal Server Error." });
    }
};

//Test using a PUT request to http://localhost:8080/customerProgress/<#ID>
// Where <#ID> is the id of a user
// The body should be a JSON of the format: {"progress": <#Progress_Value>}. Example: {"progress": 5}
const updateProgress = async (req, res) => {
    try {
        if (!req?.params?.id) return res.status(400).json({ 'message': 'Client ID required.' });

        const user = await Client.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(204).json({ "message": `No Client matches ID ${req.params.id}.` });
        }
        if (req.body?.progress) user.progress = req.body.progress;
        const result = await user.save();
        res.json(result);

    } catch (error) {
        // Checking for a CastError
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(400).json({ "message": `Invalid Client ID: ${req.params.id}.` });
        }

        // Log the error
        //console.error("Error fetching user progress:", error);
        
        // Return a generic server error message
        res.status(500).json({ "message": "Internal Server Error." });
    }
};

const getCustomersAtStep = async (req, res) => {
    const cookies = req.cookies;
    const { stepNum } = req.body;
    if (!stepNum) return res.status(400).json({ 'message': 'Must include progress step' });
    const users = await Client.find({ progress: stepNum }).exec();

    res.json({users});
};

// This is for testing purposes only. Remove before final deployment
const getAllUserData = async (req, res) => {
    const users = await Client.find();
    if (!users) return res.status(204).json({ 'message': 'No users found.' });
    res.json(users);
}

const getClientIDByEmail = async (req, res) => {
    try {
      if (!req?.params?.email) return res.status(400).json({ 'message': 'Email parameter is required.' });
  
      const client = await Client.findOne({ email: req.params.email });
  
      if (!client) {
        return res.status(404).json({ "message": `No client matches the email: ${req.params.email}.` });
      }
  
      // Return the client's ID
      res.json({ "id": client._id });
    } catch (error) {
      // Handle any potential errors here
      res.status(500).json({ "message": "Internal Server Error." });
    }
  };


module.exports = { getAllUserData, getProgress, updateProgress, getCustomersAtStep, getClientIDByEmail }
