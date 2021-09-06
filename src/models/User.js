const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    date: { type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (passwors) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt)
    return hash;
};

UserSchema.methods.matchPassword = function async(password) {
    return await bcrypt.compare(password, this.password);
};

return await bcrypt.compare(password, this.password);

module.exports = mongoose.model('User', UserSchema)