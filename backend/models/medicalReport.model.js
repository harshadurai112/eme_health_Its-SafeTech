const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reportSchema = new Schema({
    reportName: {
        type: String,
    },
    hospitalName: {
        type: String,
    },
    referedBy: {
        type: String,
    },
    diagnosisPurpose: {
        type: String,
    },
    verifiedBy : {
        type: String,
    },
    hash: {
        type: String,
    },
});

const Report = mongoose.model('reports', reportSchema);

module.exports = {
    Report,
}   