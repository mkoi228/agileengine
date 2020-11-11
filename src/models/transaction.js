const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transaction = new Schema({
    '_id': { 'type': String, 'required': false },
    'type': { 'type': String, 'required': true },
    'amount': { 'type': Number, 'required': true },
    'effectiveDate': { 'type': Date, 'required': false, 'default': Date.now }
  
});

module.exports = mongoose.model('Transaction', transaction);