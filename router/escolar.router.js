const router = require('express').Router();

const mongoose = require('mongoose');
var status = require('http-status');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/control_escolar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Escolar = require('../models/escolar.model');

module.exports = () => {
    /** Insertar escolares */
    router.post('/', (req, res) => {
        escolar = req.body;

        Escolar.create(escolar)
            .then(
                (data) => {
                        console.log(data);
                        res.json(
                            {
                                code: status.OK,
                                msg: 'Se insertó correctamente',
                                data: data
                            }
                        )                   
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json(
                            {
                                code: status.BAD_REQUEST,
                                msg: 'Ocurrió un error',
                                err: err.name,
                                detal: err.message
                            }
                        )
                }
            );
    });
    
    return router;
}