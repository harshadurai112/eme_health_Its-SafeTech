const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let emergencySchema = new Schema({
    name: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    phoneNumber: {
        type: String,
    }
});

const Emergency = mongoose.model('emergency', emergencySchema);

module.exports = {
    Emergency,
}   