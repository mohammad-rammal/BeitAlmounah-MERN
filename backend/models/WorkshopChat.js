const mongoose = require('mongoose');
const Joi = require('joi');

const workshopChatSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    workshop_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Workshop"
    },
    message: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    message_date: {
        type: Date,
        default: Date.now
    },
    reactions: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        emoji: {
            type: String,
        }
    }],
}, { timestamps: true });


const WorkshopChat = mongoose.model('WorkshopChat', workshopChatSchema);

const workshopChatValidationSchema = Joi.object({
    user_id: Joi.string().trim().required(),
    workshop_id: Joi.string().trim().required(), 
    message: Joi.string().trim().min(1).max(1000),
    message_date: Joi.date(),
});

module.exports = {
    WorkshopChat,
    workshopChatValidationSchema,
};
