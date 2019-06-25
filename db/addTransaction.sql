INSERT INTO transactions (trans_currency_id, sender_id, recipient_id, amount, TIMESTAMP)
VALUES (1, $2, $3, $4, now())