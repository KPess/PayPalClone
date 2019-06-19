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
    trans_date DATE,
    FOREIGN KEY (sender_id) REFERENCES paypal_users(id)
  )

  CREATE TABLE currencies (
    currency_id SERIAL PRIMARY KEY,
    currency_name VARCHAR(50),
    currency_unit VARCHAR(50),
    currency_symbol VARCHAR(10)
  )