const express = require('express');
const mysqlConnection = require('../db/connection.js');

const app = express.Router();

module.exports = app;

app.get('/', (req, res) => {
    res.send('     Ta bien bonita la Lily');
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
                    message: 'no existen generos disponibles'
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