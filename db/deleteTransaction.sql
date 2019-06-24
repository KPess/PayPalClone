DELETE FROM transactions 
WHERE trans_id = $1
RETURNING *;
