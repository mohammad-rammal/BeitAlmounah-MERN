const mongoose = require('mongoose');
const Joi = require('joi');

const productsSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    category: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 100, 
        required: true,
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "User",
        required: true,
    },
    approval_status: {
        type: String,
        enum: ['pending'],
    },
}, { timestamps: true });

const Products = mongoose.model('Products', productsSchema);

const productsValidationSchema = Joi.object({
    product_name: Joi.string().trim().min(3).max(255).required(),
    category: Joi.string().trim().min(2).max(100),
    description: Joi.string().trim(),
    price: Joi.number().required(),
    image: Joi.string().trim(),
    user_id: Joi.string().trim().required(),
});

module.exports = {
    Products,
    productsValidationSchema,
};
