const mongoose = require("mongoose");
const Joi = require("joi");

// Destructure Schema from mongoose
const { Schema } = mongoose;

//Post Schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: Object,
        default: {
            url: "",
            publicId: null,
        }
    },
    likes: [
        {
            type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
            ref: "User"
        }
    ],
    approve: [
        {
            type: Boolean,
            default: false
        }
    ]
}, {
    timestamps: true,
});

// Post Model
const Post = mongoose.model("Post", PostSchema);

//Validate Create Post
function validateCreatePost(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200).required(),
        description: Joi.string().trim().min(10).required(),
        category: Joi.string().trim().required(),
        price: Joi.string().trim().required(),
    });
    return schema.validate(obj);
}

//Validate Update Post
function validateUpdatePost(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200),
        description: Joi.string().trim().min(10),
        category: Joi.string().trim(),
        price: Joi.string().trim(),
    });
    return schema.validate(obj);
}

module.exports = {
    Post,
    validateCreatePost,
    validateUpdatePost
}
