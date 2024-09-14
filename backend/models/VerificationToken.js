const mongoose = require("mongoose");


//Verifivation Token Schema
const verificationTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },

}, { timestamps: true }
);


// Verifivation Token Model
const verificationToken = mongoose.model("verificationToken", verificationTokenSchema);



module.exports = {
    verificationToken
}