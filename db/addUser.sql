INSERT INTO paypal_users 
(username, email, passwordhash, first_name, last_name, preferred_currency, balance)
VALUES ($1, $2, $3, $4, $5, $6, $7, 0);