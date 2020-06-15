const mysql = require ('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'contrasena',
    database: 'autos'
});

let registerModel = {};

registerModel.getRegister = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM register ORDER BY id',
            (err, rows) =>{
                if (err){
                    throw err;
                }else {
                callback(null, rows);
                }
            }
        )
    }
};

module.exports = registerModel;
