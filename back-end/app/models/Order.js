const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true
    },
    status: {
        type: String,
        default: 'unpaid'
    },
    shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shipment',
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment',
        required: true
    }
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;