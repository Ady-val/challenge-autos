const express = require('express');
const mysqlConnection = require('../db/connection.js');

const app = express.Router();

module.exports = app;

app.get('/', (req, res) => {
    res.send('server corriendo');
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
    console.log('usuario que llega: ' + user);

    var sql = 'SELECT id_rol FROM user WHERE id = ?'

    mysqlConnection.query(sql, [user], (err, rows) => {
        if (!err) {
            const id_rol = rows[0].id_rol
            console.log('rol que saca: ' + id_rol);
            if (id_rol === '1') {
                var sql = 'SELECT * FROM cars WHERE is_active = 1';
        
                mysqlConnection.query(sql, (err, rows) => {
        
                    if (!err) {
                        if (rows.length > 0) {
                            var catalog = rows;
                            var package = {
                                status: 'success',
                                message: 'cars',
                                cars: catalog
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
        
                var sql = 'SELECT * FROM cars WHERE id_user = ? AND is_active = 1';
        
                mysqlConnection.query(sql, [user], (err, rows) => {
        
                    if (!err) {
                        if (rows.length > 0) {
                            var catalog = rows;
                            var package = {
                                status: 'success',
                                message: 'cars',
                                cars: catalog
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

app.post('/catalog/add_car/', (req, res) => {
    console.log(req.body);
    const plates = req.body.plates
    const brand = req.body.model
    const color = req.body.color
    const year = req.body.year
    const lat = req.body.lat
    const lon = req.body.lon
    const id_user = req.body.id_user

    var sql = 'SELECT * FROM cars WHERE plates = ? LIMIT 1'

    mysqlConnection.query(sql, plates, (err, rows) => {
        if (!err) {
            if (!rows.length) {
                var sql = 'INSERT INTO cars (plates, brand, color, year, lat, lon, id_user, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())'

                mysqlConnection.query(sql, [plates, brand, color, year, lat, lon, id_user], (err, rows) => {
                    console.log('llego al segundo query');
                    if (!err) {
                        var package = {
                            status: 'success',
                            message: 'guardado con exito',
                        }

                        res.status(200).send(package);

                    } else {
                        console.log(err);
                        res.status(500).json({
                            status: 'error',
                            message: '500'
                        });
                    }
                })
            } else {
                res.status(500).json({
                    status: 'error',
                    message: 'ya existe ese carro con esas placas'
                });
            }
        } else {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: '500'
            });
        }
    }) 
})

app.post('/catalog/update_car/', (req, res) => {
    const last_plates = req.body.last_plates
    const plates = req.body.plates
    const brand = req.body.brand
    const color = req.body.color
    const year = req.body.year
    const lat = req.body.lat
    const lon = req.body.lon

    var sql = 'SELECT id FROM cars WHERE plates = ?'

    mysqlConnection.query(sql, [last_plates], (err, rows) => {
        if (!err) {
            const id = rows[0].id

            sql = 'UPDATE cars SET plates = ' + plates + ', brand = ' + brand + ', color = ' + color + ', year = ' + year + ', lat = ' + lat + ', lon = ' + lon + ' WHERE id = ' + id

            mysqlConnection.query(sql, (err, rows) => {
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
        } else {
            res.status(500).json({
                status: 'error',
                message: '500'
            });
        }
    })
})

app.post('/catalog/delete_car/', (req, res) => {
    const plates = req.body.plates

    var sql = 'UPDATE cars SET is_active WHERE plates = ?'

    mysqlConnection.query(sql, [plates], (err, rows) => {
        if (!err) {

            var package = {
                status: 'success',
                message: 'eliminado con exito',
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