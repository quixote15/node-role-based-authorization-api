require('rootpath')();
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');


mongoose.connect('mongodb+srv://oministack:wehkyp-3quxna-ticNeb@caricadevelopment-mzdkg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes)
// api routes

// global error handler
app.use(errorHandler);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
  );
// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});