const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    street: {
        type: String,
        required: true,  
    },
    
    number: {
        type: String,
        required: true,
    },
    
    zipcode: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', schema);