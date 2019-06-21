CREATE TABLE paypal_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(70) NOT NULL,
  passwordhash VARCHAR(300) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  preferred_currency VARCHAR(100) NOT NULL,
  balance  DECIMAL NOT NULL,
  isAdmin BOOLEAN
  )
  
  CREATE TABLE transactions (
    trans_id SERIAL PRIMARY KEY,
    trans_currency_id INTEGER,
    sender_id INTEGER,
    recipient_id INTEGER,
    amount DECIMAL,
    trans_date DATETIME,
    FOREIGN KEY (sender_id) REFERENCES paypal_users(id)
  )

  CREATE TABLE currencies (
    currency_id SERIAL PRIMARY KEY,
    currency_name VARCHAR(50),
    currency_unit VARCHAR(50),
    currency_symbol VARCHAR(10)
  )

INSERT INTO transactions (trans_currency_id, sender_id, recipient_id, amount, trans_date)
VALUES (2, 18, 2, 500.00, now())

INSERT INTO currencies (currency_name, currency_unit, currency_symbol)
VALUES ('USD', 'dollars', '$')

INSERT INTO currencies (currency_name, currency_unit, currency_symbol)
VALUES ('Bitcoin', 'bitcoins', '₿')

INSERT INTO currencies (currency_name, currency_unit, currency_symbol)
VALUES ('Monero', 'moneroj', 'ɱ')

INSERT INTO currencies (currency_name, currency_unit, currency_symbol)
VALUES ('CAD', 'Canadian dollars', 'CAD')

INSERT INTO currencies (currency_name, currency_unit, currency_symbol)
VALUES ('Euro', 'euros', '€')

UPDATE paypal_users
SET isadmin = true
WHERE id = 18
