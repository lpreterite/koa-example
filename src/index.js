'use strict';

const config = require('config');
const app = require('./app');
const PORT = config.get('port');

app.listen(PORT);

console.log('Server listening on port: ', PORT);