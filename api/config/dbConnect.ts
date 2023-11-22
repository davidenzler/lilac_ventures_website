const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        const response = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(response.connection.readyState);
        return response.connection.readyState;
    } catch(err) {
        console.error(err);
    }
}

module.exports = connectDB;