const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    receiver: {
        type: String,
        required: [true, "Receiver can't be empty"],
        maxlength: [50, "Receiver can't be more than 50 characters"],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number can't be empty"],
        maxlength: [15, "Phone number can't be more than 10 characters"],
        trim: true
    },
    province: {
        type: String,
        required: [true, "Province can't be empty"],
        maxlength: [50, "Province can't be more than 50 characters"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City can't be empty"],
        maxlength: [50, "City can't be more than 50 characters"],
        trim: true
    },
    postalCode: {
        type: String,
        required: [true, "Postal can't be empty"],
        maxlength: [10, "Postal can't be more than 10 characters"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Address  can't be empty"],
        maxlength: [200, "Address  can't be more than 200 characters"],
        trim: true
    },
    additionalNotes: {
        type: String,
        maxlength: [100, "Address  can't be more than 200 characters"],
        trim: true
    }
});

const Address = mongoose.model('address', addressSchema);

module.exports = Address;