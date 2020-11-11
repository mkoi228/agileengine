const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    '_id': { 'type': String, 'required': false },
    'accountBalance': { 'type': Number, 'required': true },
    'transactions': { 'type': Array, 'required': false }
});

module.exports = mongoose.model('User', user);