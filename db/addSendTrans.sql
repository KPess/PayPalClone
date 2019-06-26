INSERT INTO transactions ( amount, recipient_id, sender_id, trans_date)
VALUES ($1, $2, $3, now());
UPDATE paypal_users
SET balance = balance + $1
WHERE id = $2
RETURNING *;
UPDATE paypal_users
SET balance = balance - $1
WHERE id = $3
RETURNING *;


-- INSERT INTO transactions ( amount, recipient_id, sender_id, trans_date)
-- VALUES (10, 58, 18, now());
-- UPDATE paypal_users
-- SET balance = balance + 10
-- WHERE id = 58
-- RETURNING *;
-- UPDATE paypal_users
-- SET balance = balance - 10
-- WHERE id = 18
-- RETURNING *;