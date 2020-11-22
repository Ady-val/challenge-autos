const bcrypt = require('bcrypt');

var pass = '1234'
var hash = ''

hashPassword = (password) => {

    const saltRounds = 10;

    const hashedPassword = bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) console.log(err);

            console.log("contra " + hash);
        });
    

    console.log(hashedPassword);
}

hashPassword(pass)