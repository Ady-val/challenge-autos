const express = require('express');
const app = express();
const bodyParse = require('body-parser');

//settings
const PORT = process.env.PORT || 3000;

//middlewares
app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

//Routes
app.use(require('./api/app.js'));

//Server Start
console.clear();
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on localhost port ${PORT}`));
