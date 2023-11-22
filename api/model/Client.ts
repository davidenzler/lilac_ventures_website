const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Client Schema
let clientSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String, 
    unique: true,
    required: true
  },
  phone: Number,
  street: String,
  city: String,
  state: String,
  zip: String,
  marital: String,
  employment: String,
  cPreference: String,
  progress: {
    type: Number,
    required: true
  }
})
    const ClientModel = mongoose.model("Client", clientSchema)

    module.exports = ClientModel;