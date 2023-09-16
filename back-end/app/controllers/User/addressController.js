const Address = require("../../models/Address");

module.exports = {
    get: async (req, res) => {
        const { userId } = req.query;
        try {
            const addresses = await Address.find({ userId });
            res.status(200).json(addresses);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    post: async (req, res) => {
        const fullAddress = req.body;
        try {
            const address = await Address.create(fullAddress);
            res.status(201).json(address);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        const { addressId } = req.query;
        try {
            const message = await Address.deleteOne({ _id: addressId });
            res.status(204).json(message);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const updatedAddress = await Address.findOneAndUpdate({_id : id}, data, { new: true });
            res.status(200).json(updatedAddress);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}