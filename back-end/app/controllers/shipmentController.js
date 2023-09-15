const mongoose = require("mongoose");
const Shipment = mongoose.model('Shipment', new mongoose.Schema({
    courier: String,
    services: [
        {
            _id: Number,
            name: String,
            duration: Array,
            price: Number
        }
    ]
}), 'shipment');

module.exports = {
    get: async (req, res) => {
        try {
            const shipments = await Shipment.find();
            res.status(200).json(shipments);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

