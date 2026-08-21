const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: String,
    city: String,
    totalBeds: Number,
    availableBeds: Number
});

module.exports = mongoose.model('Hospital', hospitalSchema);
