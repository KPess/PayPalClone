SELECT transactions.trans_id, paypal_users.username, transactions.amount, transactions.trans_date
FROM transactions
JOIN paypal_users ON transactions.sender_id=paypal_users.id
WHERE id = $1