const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    titulo: { type: String, required: true },
    descripsion: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('note', noteSchema)