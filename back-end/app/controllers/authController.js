const User = require("../models/User");
const jwt = require("jsonwebtoken");

// utility functions
const createJWT = (id) => {
    const secret = require("../../config/config").secret
    return jwt.sign({ id }, secret, {
        expiresIn: 3 * 24 * 60 * 60 // expires in 3 days (written in seconds)
    });
};

const handleErrors = (error) => {
    let errors = { username: '', email: '', password: '' };

    // incorrect email
    if (error.message === "User with this email doesn't exist"){
        errors.email = error.message;
        return errors;
    }
    // incorrect password
    if(error.message === "Incorrect password"){
        errors.password = error.message;
        return errors;
    }
    // duplicated email
    if (error.code === 11000){
        errors.email = "Email already exists";
        return errors;
    }
    // error validation
    if (error.message.includes("user validation failed")){
        Object.values(error.errors).forEach(({ properties }) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

module.exports = {
    signup: async (req, res) => {
        const { username, email, password } = req.body;
        // encrypt occurs in models
        try {
            const user = await User.create({ username, email, password });
            const token = createJWT(user._id);
            const userResponse = { ...user.toObject() };
            delete userResponse.password; 
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
            res.status(201).json(userResponse);
        } catch (error) {
            const errors = handleErrors(error);
            res.status(400).json({ errors });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        
        try {
            const user = await User.login(email, password);
            const token = createJWT(user._id);
            const userResponse = { ...user.toObject() };
            delete userResponse.password; 
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
            res.status(200).json(userResponse);
        } catch (error) {
            const errors = handleErrors(error);
            res.status(400).json({ errors });
        }
    },
    logout: (req, res) => {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User logged out" });
    }
}