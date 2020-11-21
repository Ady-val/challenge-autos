const express = require('express');
const mysqlConnection = require('../db/connection.js');

const app = express.Router();

module.exports = app;

app.get('/', (req, res) => {
    res.send('Insisto en que ta bien bonita la Lily');
});

app.get('/get_rol', (req, res) => {

    var sql = 'SELECT * FROM rol';

    mysqlConnection.query(sql, (err, rows) => {
        
        if (!err) {
            if (rows.length > 0) {
                var rol = rows;
                var package = {
                    status: 'success',
                    message: 'generos',
                    genders: rol
                }

                res.status(200).send(package);

            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'no existen datos disponibles'
                });
            }
        } else {
            res.status(500).json({
                status: 'error',
                message: '500'
            });
        }
    })
})

app.get('/catalog/get_data/:user/', (req, res) => {
    const user = req.params.user

    var sql = 'SELECT id_rol FROM user WHERE id = ?'

    mysqlConnection.query(sql, [user], (err, rows) => {
        if (!err) {
            const id_rol = rows[0].id_rol

            if (id_rol === '1') {
                var sql = 'SELECT * FROM cars';
        
                mysqlConnection.query(sql, (err, rows) => {
        
                    if (!err) {
                        if (rows.length > 0) {
                            var catalog = rows;
                            var package = {
                                status: 'success',
                                message: 'generos',
                                genders: catalog
                            }
        
                            res.status(200).send(package);
        
                        } else {
                            res.status(404).json({
                                status: 'error',
                                message: 'no existen datos disponibles'
                            });
                        }
                    } else {
                        res.status(500).json({
                            status: 'error',
                            message: '500'
                        });
                    }
                })
        
            } else {
        
                var sql = 'SELECT * FROM cars WHERE id_user = ?';
        
                mysqlConnection.query(sql, [user], (err, rows) => {
        
                    if (!err) {
                        if (rows.length > 0) {
                            var catalog = rows;
                            var package = {
                                status: 'success',
                                message: 'generos',
                                genders: catalog
                            }
        
                            res.status(200).send(package);
        
                        } else {
                            res.status(404).json({
                                status: 'error',
                                message: 'no existen datos disponibles'
                            });
                        }
                    } else {
                        res.status(500).json({
                            status: 'error',
                            message: '500'
                        });
                    }
                })
            }

        } else {
            res.status(404).json({
                status: 'error',
                message: 'no existe ese usuario'
            });
        }
    })
})

app.put('catalog/add_car', (req, res) => {
    const plates = req.body.plates
    const brand = req.body.brand
    const color = req.body.color
    const year = req.body.year
    const lat = req.body.lat
    const lon = req.body.lon
    const id_user = req.body.id_user

    var sql = 'INSERT INTO cars (plates, brand, color, year, lat, lon, id_user, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())'

    mysqlConnection.query(sql, [plates, brand, color, year, lat, lon, id_user], (err, rows) => {
        if (!err) {
            var package = {
                status: 'success',
                message: 'guardado con exito',
            }

            res.status(200).send(package);

        } else {
            res.status(500).json({
                status: 'error',
                message: '500'
            });
        }
    })
})