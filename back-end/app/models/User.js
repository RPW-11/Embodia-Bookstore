const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username can't be empty"],
        maxlength: [50, "Username can't be more than 50 characters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email can't be empty"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be atleast 8 characters"]
    },
    cart: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    orders: [{
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
            required: true
        },
    }]
});

// encrypt password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// user login
userSchema.statics.login = async function (email, password){
    const user = await this.findOne ({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("User with this email doesn't exist")
}

const User = mongoose.model('user', userSchema);

module.exports = User;