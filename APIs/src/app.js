const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'));
app.use(bodyParse.json());

//routes
require('./routes/userRoutes')(app);

app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});