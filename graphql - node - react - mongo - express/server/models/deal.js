const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealSchema = new Schema({
    name: String,
    businessName: String,
    description: String,
    dealTime:String,
    dealHours:String,
    businessId:String
});

// exporting a collection with the name of Deal, and that looks like DealSchema
module.exports = mongoose.model('Deal',DealSchema);
