SELECT t.trans_id, t.trans_date, p.email, t.amount
FROM transactions t 
INNER JOIN paypal_users p ON t.recipient_id = p.id
WHERE p.id = $1