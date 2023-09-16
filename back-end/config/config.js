const dotenv = require("dotenv");
dotenv.config();

const config = {
    dbURI: String(process.env.DATABASEURI),
    port: Number(process.env.PORT),
    secret: String(process.env.SECRET)
};

module.exports = config;

