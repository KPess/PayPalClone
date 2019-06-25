UPDATE paypal_users
SET balance += $1
WHERE id = $2
RETURNING *;