const Order = require("../../models/Order");

module.exports = {
    get: async (req, res) => {
        const { userId } = req.params;
        try {
            const orders = await Order.find({ userId });
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        const data = req.body;
        try {
            const order = await Order.create(data);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    put: async (req, res) => {
        const { orderId } = req.params;
        const data = req.body;
        try {
            const order = await Order.findOneAndUpdate({ _id: orderId }, data, { new: true });
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}