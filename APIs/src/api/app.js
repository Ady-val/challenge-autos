const express = require('express');
const mysqlConnection = require('../db/connection.js');
const bcrypt = require('bcrypt');

const app = express.Router();

module.exports = app;

app.get('/', (req, res) => {
    res.send('server corriendo');
});

comparePasswords = async (clientPassword, serverPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(clientPassword, serverPassword, (err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

app.get('/user/log_in/:username/:password', (req, res) => {

    const username = req.params.username;
    const password = req.params.password;

    var sql = 'SELECT password, id, id_rol, name FROM user WHERE username = ?';

    mysqlConnection.query(sql, username, async (err, rows) => {

        if (!err) {


            if (rows.length > 0) {
                
                const server_password = rows[0].password;
                const id_user = rows[0].id;
                const id_user_type = rows[0].id_rol;
                const name = rows[0].name;
                
                var package = {
                    status: 'success',
                    message: 'inicio con exito',
                }

                let isMatch = await comparePasswords(password, server_password);

                if (isMatch) {

                    const data = {

                        status: 'success',
                        message: 'cars',
                        id_user: id_user,
                        id_user_type: id_user_type,
                        user_name: name,
                        Auth_Bool: 1,
                        Authorized: "Yes"
                    }
                    res.status(200).send(data);

                } else {
                    res.status(403).json({
                        status: 'error',
                        message: 'access denied'
                    });
                    console.log(err);
                }

            } else {

                res.status(404).json({
                    status: 'error',
                    message: 'no existen datos disponibles'
                });
                console.log(err);
            }
        } else {

            res.status(500).json({
                status: 'error',
                message: 'no existen datos disponibles'
            });
            console.log(err);
        }
    });
});

app.get('/catalog/get_data/:user/', (req, res) => {
    const user = req.params.user

    var sql = 'SELECT id_rol FROM user WHERE id = ?'

    mysqlConnection.query(sql, [user], (err, rows) => {
        if (!err) {
            const id_rol = rows[0].id_rol
            if (id_rol === 1) {
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

            sql = 'UPDATE cars SET plates = "' + plates + '", brand = "' + brand + '", color = "' + color + '", year = ' + year + ', lat = ' + lat + ', lon = ' + lon + ' WHERE id = ' + id

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
                        message: '500 query 2'
                    });
                    console.log('query 2');
                    console.log(err);
                }
            })
        } else {
            res.status(500).json({
                status: 'error',
                message: '500 query 1'
            });
            console.log('query 1');
            console.log(err);
        }
    })
})

app.post('/catalog/delete_car/:plates/', (req, res) => {
    const plates = req.params.plates
    var sql = 'UPDATE cars SET is_active = 0 WHERE plates = ?'

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