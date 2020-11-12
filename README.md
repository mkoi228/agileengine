# Agile Engine restAPI 

## Initialization

How to run back and front services

### Backend

Change directory into ./AgileBack and run $ npm run startdev

Endpoints will be working on localhost:4242

### Frontend

Change directory into ./AgileFront and run $ npm start

You will found the Main Page under localhost:3000

## Endpoints

Main Page
http://localhost:4242/api/gettransactionshistory

Find one transaction by ID
http://localhost:4242/api/gettransactionbyid/:id

Create transaction
http://localhost:4242/api/createtransaction

See the account balance
http://localhost:4242/api/getaccountbalance