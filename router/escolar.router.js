const router = require('express').Router();

const mongoose = require('mongoose');
var status = require('http-status');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/controlescolar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Escolar = require('../models/escolar.model');

module.exports = () => {
    /** Insertar alumno */
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
                                default: err.message
                            }
                        )
                }
            );
    });

        /** Consulta general control escolar*/
    router.get('/', (req, res) => {
        Escolar.find({})
            .then(
                (escolares) => {
                    res.json({
                        code: status.OK,
                        msg: 'Consulta correcta',
                        data: escolares
                    })
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    });

    /** Eliminar alumno*/
    router.delete('/:id', (req, res) => {
        id = req.params.id;
        Escolar.findByIdAndRemove(id)
            .then(
                (data) => {
                    if(data)
                        res.json({
                            code: status.OK,
                            msg: 'Se eliminó correctamente',
                            data: data
                        })
                    else 
                        res.status(status.NOT_FOUND)
                        .json({
                            code: status.NOT_FOUND,
                            msg: 'No se encontró el elemento'
                        })
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    });

    /** Consulta alumno por _id */
    router.get('/:id', (req, res) => {

        const id = req.params.id;

        Escolar.findOne({ _id: id })
            .then(
                (escolar) => {
                    if (escolar)
                        res.json({
                            code: status.OK,
                            msg: 'Consulta correcta',
                            data: escolar
                        });
                    else
                        res.status(status.NOT_FOUND)
                            .json({
                                code: status.NOT_FOUND,
                                msg: 'No se encontró el elemento'
                            });

                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    });

    /** Actualización */
    router.put('/:id', (req, res) => {
        id = req.params.id;
        escolar = req.body;
        Escolar.findByIdAndUpdate(id, escolar, { new: true })
            .then(
                (data) => {
                    console.log(data);
                    res.json({
                        code: status.OK,
                        msg: 'Se actualizó correctamente',
                        data: data
                    });
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                    res.status(status.BAD_REQUEST);
                    res.json({
                        code: status.BAD_REQUEST,
                        msg: 'Error en la petición',
                        err: err.name,
                        detail: err.message
                    })
                }
            )
    });
    
    return router;
}