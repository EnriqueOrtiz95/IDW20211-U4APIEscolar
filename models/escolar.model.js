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
            validate: {
                validator: function(v) {
                  return /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/.test(v);
                },
                message: `La CURP no es valida!`
            }
        },
        create_date: {
            type: Date,
            default: Date.now,
            required: true
        },
        controlnumber: {
            type: String,
            required: true,
            unique: true
        },
        grade: {
            type: Number,
            required: true,
            validate(value) {
                if (value >= 0 && value <= 100) {     
                } else {
                    throw new Error("La calificacion debe ser Mayor o igual que 0 y menor o igual que 100");
                }
            }
        },
        career: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                  return /(ISC|IM|IGE|IC){1}/.test(v);
                },
                message: `No es valida la carrera ingresada elegir (ISC, IM, IGE, IC)`
            }
        }
    }
);

const escolarModel = mongoose.model('Escolar', schema, 'escolar');

module.exports = escolarModel;