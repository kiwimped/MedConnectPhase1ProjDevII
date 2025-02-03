const mongoose = require('mongoose');

const {Schema} = mongoose
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    isDoctor: Boolean,
    termAgree: Boolean,
    specialty: String,
    location: String,
    experience: Number,
    
})

const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel;