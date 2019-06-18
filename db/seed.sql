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
    id SERIAL PRIMARY KEY,
    
  )