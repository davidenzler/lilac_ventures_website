const mongoose = require('mongoose');

exports.connectDB = async() => {
    try {
            await mongoose.connect(process.env.DB_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
    } catch(err) {
        console.error(err);
    }
}   
export {}