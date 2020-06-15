const Register = require('./models/register');

module.exports = function (app) {
    app.get('/register', (req, res) => {
        Register.getRegister((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/register', (req, res) => {
        
    })
}