const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Client Schema
let clientSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  phone: Number,
  street: String,
  city: String,
  state: String,
  zip: String,
  marital: String,
  employment: String,
  cPreference: String
})
    const ClientModel = mongoose.model("Client", clientSchema)

    module.exports = ClientModel;