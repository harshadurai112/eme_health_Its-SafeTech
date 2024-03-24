const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let formDataSchema = new Schema({ 
    
    fullName: {
        type : String,
    },
    dob: {
        type : String,
    },
    gender: {
        type : String,
    },
    maritalStatus: {
        type : String,
    },
    minor:{
        type  : String,
    },
    guardianName: {
        type : String,
    },
    patientEmploymentStatus: {
        type : String,
    },
    phoneNumber: {
        type : String,
    },
    email : {
        type : String
    },
    address : {
        type : String,
    },
    city : {
        type : String,
    },
    state : {
        type : String,
    },
    postalCode: {
        type : String,
    },
})

const FormDataModel = mongoose.model('formData',formDataSchema)

module.exports = {
    FormDataModel
}