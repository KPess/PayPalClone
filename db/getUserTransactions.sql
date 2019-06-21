-- Show current user a list of trasactions where they are the sender. Include the date, recipient email, amount.
SELECT t.trans_id, t.trans_date, p.email, t.amount
FROM transactions t 
INNER JOIN paypal_users p ON t.recipient_id = p.id
WHERE p.id = $1

-- Show current user a list of transactions where they are the recipient. Include date, sender email, amount.
SELECT t.trans_id as "Transaction ID", t.trans_date as "Date", p.email as "Sender's Email", t.sender_id as "Sender's ID", t.recipient_id as "Recipients' ID", t.amount as "Amount Received"
FROM transactions t 
INNER JOIN paypal_users p ON t.sender_id = p.id
WHERE t.recipient_id = 2
