# Agile Engine restAPI 

## INITIALIZATION

How to run back and front services

### MongoDB

You need to create a database in mongo called "agileengine"

Then you need to run mongo locally: 

$ mongod

Your monbodb should be running in "mongodb://localhost:27017/agileengine"

### Backend

Change directory into ./AgileBack and run $ npm run startdev

Endpoints will be working on localhost:4242

### Frontend

Change directory into ./AgileFront and run $ npm start

You will found the Main Page under localhost:3000

## ENDPOINTS

Main Page
http://localhost:4242/api/gettransactionshistory

Find one transaction by ID
http://localhost:4242/api/gettransactionbyid/:id

Create transaction
http://localhost:4242/api/createtransaction

See the account balance
http://localhost:4242/api/getaccountbalance