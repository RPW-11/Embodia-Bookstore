const dbURI = require("./config.js").dbURI;
const mongoose = require("mongoose");

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB: ", err);
});

const db = mongoose.connection;

module.exports = db;

