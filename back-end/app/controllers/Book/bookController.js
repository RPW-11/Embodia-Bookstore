const Book = require("../../models/Book");

const handleErrors = (error) => {
    let errors = { title:'',
        author: '',
        description: '',
        price: '',
        coverImage: '',
        genre: '',
        publishedDate: '',
        stockQuantity: ''
    };

    // error validation
    if (error.message.includes("book validation failed")){
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

module.exports = {
    get: async (req, res) => {
        const { bookIds } = req.query;
        let books = null;  
        try {
            if(bookIds){
                books = await Book.find({
                    _id: { $in : bookIds }
                });
                res.status(200).json(books);
            }
            else{
                books = await Book.find();
                res.status(200).json(books);
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        try {
            const book = await Book.findById(id);
            res.status(200).json(book);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    add: async (req, res) => {
        const bookData = req.body;
        bookData.publishedDate = new Date(bookData.publishedDate);
        try {
            const book = await Book.create(bookData);
            res.status(201).json(book);
        } catch (error) {
            const errors = handleErrors(error);
            res.status(400).json({ errors });
        }
    },
    delete: async (req, res) => {
        const bookId = req.params.id;
        try {
            const message = await Book.deleteOne({ _id: bookId });
            res.status(204).json(message);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const bookData = req.body;
        try {
            const message = await Book.findOneAndUpdate({ _id: id }, bookData, { new: true });
            res.status(200).json(message);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    search: async (req, res) => {
        const { q } = req.query;
        try {
            const books = await Book.aggregate([{
                $search: {
                    index: "searchBooks",
                    text: {
                        query: q,
                        path: {
                            wildcard: "*"
                        },
                        fuzzy: {}
                    }
                }
            }]);
            res.status(200).json(books);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    autoComplete: async (req, res) => {
        const { q } = req.query;
        try {
            const books = await Book.aggregate([
                {
                    $search: {
                        index: "autoCompleteBooks",
                        autocomplete: {
                            query: q,
                            path: "title",
                            tokenOrder: "sequential"
                        }
                    }
                },
                { $limit: 5 },
                {
                    $project: { title: 1}
                }
            ]);
            res.status(200).json(books);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}