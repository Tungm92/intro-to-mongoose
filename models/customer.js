// create mongoose models
// require mongoose
// construct schema
// call schema
// export schema

// require mongoose
const mongoose = require('mongoose');

// construct schema
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

// call schema
const Customer = mongoose.model('Customer', customerSchema);

// export schema
module.exports = Customer;