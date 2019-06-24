require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authController = require('./controllers/authController');
const adminController = require('./controllers/adminController')
const userController = require('./controllers/userController')
const stripe = require("stripe")("sk_test_rQjptKVen4my7b1D9ilzKtk500biiETnqV")

const app = express();

app.use(express.json()); //app.use is for middleware
app.use(require("body-parser").text());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Check out my MASSIVE connection');
})


//auth endpoints
app.post('/auth/register/user', authController.register);
app.post('/auth/login/user', authController.login);
app.get('/auth/logout', authController.logout);

//admin endpoints
app.get('/transactions', adminController.getAllTransactions)
app.post('/transactions', adminController.addTransaction)
app.delete('/transactions/:id', adminController.deleteTransaction)
app.get('/currencies', adminController.getCurrencies)
app.post('/currencies', adminController.addCurrency)
app.delete('/currencies/:id', adminController.deleteCurrency)
app.put('/user/balance/:id', adminController.updateBalance)
// app.put('/transactions/:id', adminController.updateTransaction)

//user endpoints
app.get('/user/rcvdtransactions', userController.getRcvdTransactions)
app.get('/user/senttransactions', userController.getSentTransactions)
app.post('/user/transactions', userController.addTransaction)
app.put('/user/:id', userController.updateEmail)
app.delete('/user/:id', userController.deleteAccount)
app.post('/charge', userController.chargeCard)

app.listen(5050, () => console.log(`Listening on Port 5050`));