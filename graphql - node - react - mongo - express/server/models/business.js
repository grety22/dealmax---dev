const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state:String,
    postalCode:Number,
    phone:Number,
    email:String,
    typeOfBusiness:String
});

// exporting a collection with the name of Business, and that looks like BusinessSchema
module.exports = mongoose.model('Business',BusinessSchema);
