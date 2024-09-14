const mongoose = require('mongoose');
const Joi = require('joi');

const creditCardSchema = new mongoose.Schema(
    {
        cardNumber: {
            type: String,
            required: true,
            trim: true,
            minlength: 16,
            maxlength: 16
        },
        cardHolder: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        expirationMonth: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 2
        },
        expirationYear: {
            type: String,
            required: true,
            trim: true,
            minlength: 4,
            maxlength: 4
        },
        hashedCvv: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
    }, { timestamps: true });

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

function creditCardValidation(obj){
    const schema = Joi.object({
    cardNumber: Joi.string().trim().min(16).max(16).required(),
    cardHolder: Joi.string().trim().min(2).max(100).required(),
    expirationMonth: Joi.string().trim().min(1).max(2).required(),
    expirationYear: Joi.string().trim().min(4).max(4).required(),
    hashedCvv: Joi.string().trim().min(3).max(4).required(),
});
return schema.validate(obj);
}

function validateUpdateCreditCard(obj){
    const schema = Joi.object({
    cardNumber: Joi.string().trim().min(16).max(16),
    cardHolder: Joi.string().trim().min(2).max(100),
    expirationMonth: Joi.string().trim().min(1).max(2),
    expirationYear: Joi.string().trim().min(4).max(4),
    hashedCvv: Joi.string().trim().min(3).max(4),
});
return schema.validate(obj);
}

module.exports = {
    CreditCard,
    creditCardValidation,
    validateUpdateCreditCard,
};
