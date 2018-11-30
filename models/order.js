const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    number: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created',
    },

    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    }],

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Order', schema);