SELECT t.trans_id, t.trans_date, p.email, t.amount
FROM transactions t 
INNER JOIN paypal_users p ON t.recipient_id = p.id
WHERE t.sender_id = 18