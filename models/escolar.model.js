const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50
        },
        lastname: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50
        },
        curp: {
            type: String,
            required: true,
            $regex: /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
        },
        create_date: {
            type: Date,
            required: true,
            default: Date.now
        },
        controlnumber: {
            type: String,
            required: true,
            unique: true
        },
        grade: {
            type: Number,
            required: true
        },
        career: {
            type: String,
            required: true,
            $regex: /(ISC|IM|IGE|IC){1}/
        }
    }
);

const escolarModel = mongoose.model('Escolar', schema, 'escolar');

module.exports = escolarModel;