const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    url: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    },

    price: {
        type: Number,
        required: true,
    },

    tags: [{
        type: String,
        require: true
    }]
});

module.exports = mongoose.model('Product', schema);