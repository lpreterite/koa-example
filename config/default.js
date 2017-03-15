'use strict';

const path = require('path');

let config = {
    db: {
        "mysql": 'mysql://root:@localhost:3306/test'
    },
    secret: process.env.SECRET || 'faekkkeee00$',
    port: process.env.PORT || 3031,
    template_path: path.join(__dirname, '../src/templates'),
    public_path: path.join(__dirname + '../public')
};

module.exports = config;