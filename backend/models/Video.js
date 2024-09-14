const Joi = require('joi');
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    watchedCheckbox: {
        type: Boolean,
        default: false,
    },
});

const Video = mongoose.model('Video', videoSchema);

// Create a Joi validation schema
const videoValidationSchema = Joi.object({
    title: Joi.string().required().trim(),
    url: Joi.string().required(),
    watchedCheckbox: Joi.boolean(),
});

module.exports = {
    videoSchema,
    Video,
    videoValidationSchema,
};

