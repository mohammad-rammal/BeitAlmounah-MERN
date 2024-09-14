const mongoose = require('mongoose');
const Joi = require('joi');
const { videoSchema, videoValidationSchema } = require('./video');

const workshopSchema = new mongoose.Schema({
    workshopName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
    },
    category: {
        type: String,
        enum: ['Mouneh', 'Crafting'],
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
    video: videoSchema,
}, { timestamps: true });

const Workshop = mongoose.model('Workshop', workshopSchema);

const workshopValidationSchema = Joi.object({
    workshopName: Joi.string().trim().min(3).max(255).required(),
    category: Joi.string().valid('Mouneh', 'Crafting').trim().required(),
    description: Joi.string().trim(),
    image: Joi.string(),
    video: videoValidationSchema,
});

module.exports = {
    Workshop,
    workshopValidationSchema,
};
