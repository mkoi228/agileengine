'use strict';

const express = require('express');
const router = express.Router();

const hello = require('../services/transactions_service.js')

// All routes to handle go here.
module.exports = function(app) {

    router.get('/api/transactions', hello.sayHello);

    return router;
};