
const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure Schema from mongoose

const patientBookSchema = new Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    provider: { type: String, required: true },
});

const patientBookModel = mongoose.model("patientbooking", patientBookSchema);
module.exports = patientBookModel;
