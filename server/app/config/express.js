/* globals __dirname */

const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const init = (app) => {
    if (typeof app.use !== 'function' ||
        typeof app.set !== 'function') {
        throw new Error('Invalid app!');
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(morgan('combined'));
    app.use(cors());

    app.use('/static', express.static(path.join(__dirname, '../../public')));
};

module.exports = {
    init,
};
