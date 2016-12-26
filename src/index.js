'use strict';

const config = require('config');
const app = require('./app');
const PORT = process.env.PORT || config.get('port');

app.listen(PORT);

console.log('Server listening on port: ', PORT);