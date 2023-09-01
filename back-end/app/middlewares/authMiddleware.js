const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, secret, (error, decodedToken) => {
            if (!error) {
                console.log(decodedToken);
                next();
            }
            else {
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { requireAuth };