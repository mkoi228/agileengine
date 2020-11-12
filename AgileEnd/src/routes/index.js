const express = require('express');
const router = express.Router();

const transactions = require('../services/transactions_service.js')

// All routes to handle go here.
module.exports = function(app) {

    // TRANSACTION
    router.get      ('/api/gettransactionshistory', transactions.getTransactionsHistory);
    router.get      ('/api/gettransactionbyid/:id', transactions.getTransactionsByID);
    router.post     ('/api/createtransaction', transactions.createTransaction);

    // ACCOUNT
    router.get      ('/api/getaccountbalance', transactions.getAccountBalance);

    return router;
};