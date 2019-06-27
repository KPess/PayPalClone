const bcrypt = require("bcryptjs");

module.exports = {
  register: (req, res) => {
    console.log(req.body);
    //Make sure we have all of our information
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      preferredCurrency
    } = req.body;
    if (
      !username ||
      !password ||
      !email ||
      !firstName ||
      !lastName ||
      !preferredCurrency
    ) {
      res.status(406).json({
        error: "Please fill in all information"
      });
    } else {
      //Check to see if the username is already taken
      const db = req.app.get("db");
      db.checkForUser(username).then(users => {
        if (users.length > 0) {
          res.status(401).json({ error: "Username Already Taken" });
        } else {
          //Hash the password
          bcrypt.hash(password, 10).then(hash => {
            //put them in the database
            // console.log(hash);
            db.addUser(
              username,
              email,
              hash,
              firstName,
              lastName,
              preferredCurrency
            ).then(() => {
              //send a response
              req.session.user = {
                username,
                email,
                firstName,
                lastName,
                preferredCurrency,
                balance: 0
              };
              console.log(req.session.user);
              res.status(200).json(req.session.user);
            });
          });
        }
      });
    }
  },
  login: (req, res) => {
    //Make sure we have both fields filled out
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(406).json({ error: "Please fill in all fields" });
    } else {
      //Check if user exists
      const db = req.app.get("db");
      db.checkForUser(username).then(user => {
        if (user.length > 0) {
          //Check if password submitted matches password hash in database
          const isAuthenticated = bcrypt.compareSync(
            password,
            user[0].passwordhash
          );

          if (!isAuthenticated) {
            return res
              .status(403)
              .json({ error: "Incorrect login information 1" });
          } else {
            db.checkForUser(username).then(() => {
              //Set session as user
              req.session.user = {
                username: user[0].username,
                isadmin: user[0].isadmin,
                id: user[0].id,
                balance: user[0].balance,
                user: user[0]
              };
              // console.log(req.session.user);
              res.status(200).json(req.session.user);
            });
          }
        } else {
          return res
            .status(403)
            .json({ error: "Incorrect login information 2" });
        }
      });
    }
  },
  logout: (req, res) => {
    //Destroy session
    req.session.destroy();
    // console.log(req.session)
    res.sendStatus(200);
  },
  currentSession: async (req, res) => {
    const db = req.app.get('db'),
    {username} = req.session.user;

    const foundUser = await db.checkForUser(username);
    const user = foundUser[0];
    if (req.session) {
      req.session.user = {
        username: user.username,
        isadmin: user.isadmin,
        id: user.id,
        balance: user.balance,
        user: user
      };
      return res.send(req.session.user);
    }
  }
};
