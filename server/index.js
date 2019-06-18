require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authController = require('./controllers/authController');

const app = express();

app.use(express.json()); //app.use is for middleware

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
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
// app.get('/auth/login/user', authController.login);
// app.delete('/auth/logout', authController.logout);



app.listen(5050, () => console.log(`Listening on Port 5050`));