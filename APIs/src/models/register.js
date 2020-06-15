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

registerModel.insertRegister = (registerData, callback) => {
    if (connection) (
        connection.query(
            'INSERT INTO register SET ?', registerData,
            (err, result) =>{
                if (err){
                    throw err;
                } else {
                    callback(null, {
                        'InsertId': result.InsertId
                    })
                }
            }
        )
    )
}

module.exports = registerModel;
