const bcrypt = require('bcryptjs');

module.exports = {
    register: (req, res) => {
        console.log(req.body)
        //Make sure we have all of our information
        const {username, email, password,  firstName, lastName, preferredCurrency} = req.body;
        if(!username || !password || !email || !firstName || !lastName || !preferredCurrency) {
            res.status(406).json({
                error: "Please fill in all information"
            });
        } else {
            //Check to see if the username is already taken
            const db = req.app.get('db');
            db.checkForUser(username).then(users => {
                if(users.length > 0) {
                    res.status(401).json({error: "Username Already Taken"});
                } else {
                    //Hash the password
                    bcrypt.hash(password, 10).then(hash => {
                        //put them in the database
                        console.log(hash);
                        db.addUser(username, email, hash,  firstName, lastName, preferredCurrency).then(() => {
                            //send a response
                            req.session.user = {
                                username,
                                email,
                                firstName,
                                lastName,
                                preferredCurrency,
                                balance: 0
                            }
                            console.log(req.session.user)
                            res.status(200).json(req.session.user);
                        })
                    })
                }
            })
        }
    },
    login: (req, res) => {
        //Make sure we have both fields filled out
        const {username, password} = req.body;
        if (!username || !password) {
            res.status(406).json({
                error: "Please fill in all fields"
            });
        } else {
            //Check if user exists
            const db = req.app.get('db');
            db.checkForUser(username).then(user => {
                if (user.length > 0) {
                    //Check if password matches
                    const isAuthenticated = bcrypt.compareSync(password, user.passwordhash)
                    if (!isAuthenticated) {
                        return res.status(403).json({
                            error: 'Incorrect login information, please correct info or register new user'
                        })
                    } else {
                        //Set session as user
                        //Route to dashboard
                    }
                } else {
                    return res.status(403).json({
                        error: 'Incorrect login information, please correct info or register new user'
                    });
                }
            })
        }
        //Check if password hash matches
        //Route to dashboard
    },
    logout: (req, res) => {
        //Destroy session
        //Route to home page
        
    }
}