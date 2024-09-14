const mongoose = require('mongoose');
const Joi = require('joi');


const workshopParticipantsSchema = new mongoose.Schema({
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
    payment_status: {
        type: String,
        enum: ['pending', 'paid'],
        required: true
    },
    badge_awarded: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const WorkshopParticipants = mongoose.model('WorkshopParticipants', workshopParticipantsSchema);

const workshopParticipantsValidationSchema = Joi.object({
    user_id: Joi.string().trim().required(),
    workshop_id: Joi.string().trim().required(),
    payment_status: Joi.string().valid('pending', 'paid').required(),
});

module.exports = {
    WorkshopParticipants,
    workshopParticipantsValidationSchema,
};