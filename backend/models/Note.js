const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    note: { type: String, required: true }
});

module.exports = mongoose.model('Note', noteSchema);
