SELECT 
t.trans_id, 
t.trans_date, 
p.email, 
t.sender_id, 
t.recipient_id, 
t.amount
FROM transactions t 
INNER JOIN paypal_users p ON t.sender_id = p.id
WHERE t.recipient_id = $1