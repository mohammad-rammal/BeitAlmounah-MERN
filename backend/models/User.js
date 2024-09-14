const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const joip = require('joi-password-complexity')

const roles = ['user', 'trainer'];


// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: roles,
        default: 'user'
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicId: null,
        }
    },
    firstName: String,
    lastName: String,
    image: String,
    phoneNumber: String,
    address: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});



// Generate Token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
    return token;
};
// User Model
const User = mongoose.model('User', userSchema);

// Validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required(),
        username: Joi.string().trim().min(2).max(200).required(),
        password: joip(),
        firstName: Joi.string().trim(),
        lastName: Joi.string().trim(),
        image: Joi.string().trim(),
        phoneNumber: Joi.string().trim(),
        address: Joi.string().trim(),
    });
    return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(200),
        password: Joi.string().trim().min(6),
        firstName: Joi.string().trim(),
        lastName: Joi.string().trim(),
        image: Joi.string().trim(),
        phoneNumber: Joi.string().trim(),
        address: Joi.string().trim(),
    });
    return schema.validate(obj);
}


//Validate Email (express js framwork)
function validateEmail(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj);
}



//Validate New Password (express js framwork)
function validateNewPassword(obj) {
    const schema = Joi.object({
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}


module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateEmail,
    validateNewPassword
};
