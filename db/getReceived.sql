SELECT t.trans_id as "Transaction ID", t.trans_date as "Date", p.email as "Sender's Email", t.sender_id as "Sender's ID", t.recipient_id as "Recipients' ID", t.amount as "Amount Received"
FROM transactions t 
INNER JOIN paypal_users p ON t.sender_id = p.id
WHERE t.recipient_id = 2