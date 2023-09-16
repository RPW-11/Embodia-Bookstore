const User = require("../../models/User");
const Book = require("../../models/Book");

module.exports = {
    getUserCart: async (req, res) => {
        const { userId } = req.query;

        try {
            const user = await User.findOne({ _id: userId });
            res.status(200).json(user.cart);
        } catch (error) {
            res.status(400).json(error.message);
        }
    },
    addItem: async (req, res) => {
        const { userId, bookId } = req.body;

        try {
            const isBookExist = await User.findOne({ _id: userId, 'cart.bookId': bookId});
            if (isBookExist){
                throw Error("Book is already exists, use update instead");
            }
            const updatedCart = await User.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        cart: { bookId, quantity: 1 }
                    }
                },
                { new: true}
            );
            res.status(200).json({ userId: updatedCart._id, cart: updatedCart.cart });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateItem: async (req, res) => {
        const { userId, bookId, quantity } = req.body;

        try {
            const stockQuantity = await Book.findOne({ _id: bookId }).stockQuantity;
            if (quantity > stockQuantity){
                throw Error("Stock is unavailiable");
            }
            const updatedCart = await User.findOneAndUpdate(
                { _id: userId, 'cart.bookId': bookId }, 
                { $set: { 'cart.$.quantity': quantity} }, 
                { new: true }
            );
            if (!updatedCart) {
                throw Error("User or Book doesn't exist");
            }
            res.status(200).json({ userId: updatedCart._id, cart: updatedCart.cart });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteItem: async (req, res) => {
        const { userId, bookId } = req.query;
        console.log(bookId);
        try {
            let updatedCart = null;
            if (typeof bookId === 'string') {
                updatedCart = await User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $pull: {
                            cart: { bookId }
                        }
                    },
                    { new: true }
                );
            }
            else{
                updatedCart = await User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $pull: {
                            cart: { 
                                bookId: { $in: bookId }
                            }
                        }
                    },
                    { new: true }
                );
            }
            if (!updatedCart) {
                throw Error("User or Book doesn't exist");
            }
            res.status(200).json({ userId: updatedCart._id, cart: updatedCart.cart });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}