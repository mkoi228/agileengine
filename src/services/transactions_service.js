const Transaction       = require('../models/transaction.js');
// const User              = require('../models/user.js');
const { v4: uuidv4 }    = require('uuid');
const validate          = require('uuid-validate');

exports.getTransactionsHistory  = getTransactionsHistory;
exports.getTransactionsByID     = getTransactionsByID;
exports.createTransaction       = createTransaction;
exports.getAccountBalance       = getAccountBalance;

let globalBalance = 0;
let transactionsHistory = [];

let user = ({
    _id: 1,
    accountBalance: globalBalance,
    transactions: transactionsHistory
});

async function getTransactionsHistory(req, res, next){
    try {
        res.status('200').json(transactionsHistory);
    }
    catch (err) {
        res.status(400).json('Invalid status value.');
        next(err);
    }
}

async function getTransactionsByID(req, res, next){
    try {
        let id = req.params.id;
        const validUUID = validate(id);
        if (!(validUUID)) { return res.status(400).json('Invalid ID supplied.'); }

        let transactionsArray = user.transactions;
        let transactionFound = false;
        transactionsArray.forEach(element => {
            if (element._id === id) { 
                res.status(200).json(element);
                transactionFound = true;
            }
        });

        if (!(transactionFound)) { res.status(404).json('Transaction not found.'); }
        
    }
    catch (err) {
        next(err);
    }
}

async function createTransaction(req, res, next){
    try {
        if (!(req.body.type)) {
            return (
                console.log(" Transaction Type is required. "), 
                res.json(" Transaction Type is required. ")
                );
        }
        if (!(req.body.type === 'debit' || req.body.type === 'credit')) {
            return (
                console.log(" Transaction Type only can be 'credit' or 'debit'. "), 
                res.json(" Transaction Type only can be 'credit' or 'debit'. ")
                );
        }
        if (!(req.body.amount)) {
            return (
                console.log(" Transaction amount is required. "), 
                res.json(" Transaction amount is required. ")
                );
        }
        if (!(req.body.amount >= 0)) {
            return (
                console.log(" Amount can't be a negative number "), 
                res.json(" Amount can't be a negative number ")
                );
        }

        // Add transaction amount to user account
        let options = {
            user: user,
            transaction: req.body
        }
        let transactionCompleted = await updateAccoutBalance(options);
        
        if (!(transactionCompleted)) {
            res.status(403).json('There is not enough money in the account to complete the transaction.')
        } else {

            // Create Transaction
            const transaction = new Transaction(
            { 
                _id: uuidv4(),
                type: req.body.type,
                amount: req.body.amount
            });
            transaction
                .save()
                .then(result => {
                    res.status(200).json('Transaction stored');
                    console.log(result);
                })
                .catch(err => console.log('Error creating transaction', err));

            // Update user account balance and transactions, this could be persisted in a user database
            transactionsHistory.push(transaction);
            user.accountBalance = globalBalance;     
        }
    }
    catch (err) {
        next(err);
    }
}

async function getAccountBalance(req, res, next){
    try {
        res.json(`The account balance is ${globalBalance}`);
        res.status('200');
    }
    catch (err) {
        next(err);
    }
}

async function updateAccoutBalance(options){

    const transactionAmount = await parseFloat(options.transaction.amount);
    
    // This will be used to create or not the transaction if the operation's result is a negative number
    let transactionSuccess = false;

    switch (options.transaction.type) {
        case 'debit':
            if (transactionAmount > globalBalance) {
                console.log('Transaction error: There is not enough money in the account to complete the transaction.');
                transactionSuccess = false;

            } else {
                globalBalance = globalBalance - transactionAmount;
                transactionSuccess = true;
            }
            
            break;
        case 'credit':

            globalBalance += transactionAmount;
            transactionSuccess = true;

            break;
    
        default:
            break;
    } return transactionSuccess
}
