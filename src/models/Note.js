const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    tittle: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = mongoose.model('note', noteSchema)