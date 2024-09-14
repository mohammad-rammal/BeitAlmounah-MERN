const mongoose = require("mongoose");
const Joi = require("joi");



//Category Schema
const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true }
);


// Category Model
const Category = mongoose.model("Category", CategorySchema);


//Validate Create Category
function ValidateCreateCategory(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().required().label("Title"),
    });
    return schema.validate(obj);
}




module.exports = {
    Category,
    ValidateCreateCategory
}