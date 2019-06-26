require("dotenv").config();
const nodemailer = require('nodemailer');
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authController = require("./controllers/authController");
const mailController = require("./controllers/mailController");
const adminController = require("./controllers/adminController");
const userController = require("./controllers/userController");
const stripe = require("stripe")("sk_test_rQjptKVen4my7b1D9ilzKtk500biiETnqV");
const uuid = require("uuid/v4");
const cors = require("cors");
const app = express();

app.use(express.json()); //app.use is for middleware
app.use(cors());
app.use(require("body-parser").text());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Check out my MASSIVE connection");
});




//auth endpoints
app.post("/auth/register/user", authController.register);
app.post("/auth/login/user", authController.login);
app.get("/auth/logout", authController.logout);

//admin endpoints
app.get("/transactions", adminController.getAllTransactions);
app.post("/transactions", adminController.addTransaction);
app.delete("/transactions/:id", adminController.deleteTransaction);
app.get("/currencies", adminController.getCurrencies);
app.post("/currencies", adminController.addCurrency);
app.delete("/currencies/:id", adminController.deleteCurrency);
app.put("/user/balance/:id", adminController.updateBalance);
// app.put('/transactions/:id', adminController.updateTransaction)


//NODEMAILER
app.post('/send', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'paypalclone@gmail.com',
      pass: 'Baconator5000'
    }
  })
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `

  var mail = {
    from: name,
    to: `${email}`,  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})
//user endpoints
app.get("/user/rcvdtransactions", userController.getRcvdTransactions);
app.get("/user/senttransactions", userController.getSentTransactions);
app.post("/user/transactions", userController.addTransaction);
// app.put("/user/:id", userController.updateEmail);
app.put("/user/transactions/:id", adminController.updateBalance);
app.delete("/user/:id", userController.deleteAccount);
// app.put('/load/:id', userController.loadDeposit)

//Stripe endpoint
app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges
      .create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app.listen(5050, () => console.log(`Listening on Port 5050`));
