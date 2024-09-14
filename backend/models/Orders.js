const mongoose = require('mongoose');
const Joi = require('joi');

const ordersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "Product"
    },
    address: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    creditId: {
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 255
    },
    order_date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const Orders = mongoose.model('Orders', ordersSchema);

//Validate create order
function ordersValidationSchema (obj){
    const schema = Joi.object({
        user_id: Joi.string().trim().required(), 
        product_id: Joi.string().trim().required(), 
        address: Joi.string().trim().min(2).max(255),
        creditId: Joi.string().trim().min(4).max(255),
        order_date: Joi.date(), 
    })
  return schema.validate(obj);
}

//Validate Update order
function ordersUpdateSchema (obj){
    const schema = Joi.object({
        user_id: Joi.string().trim(), 
        product_id: Joi.string().trim(), 
        address: Joi.string().trim().min(2).max(255),
        creditId: Joi.string().trim().min(4).max(255),
        order_date: Joi.date(), 
    })
  return schema.validate(obj);
}

module.exports = {
    Orders,
    ordersValidationSchema,
    ordersUpdateSchema
};
