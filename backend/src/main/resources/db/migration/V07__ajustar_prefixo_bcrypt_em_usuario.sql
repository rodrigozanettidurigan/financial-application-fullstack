UPDATE usuario
SET senha = CONCAT('{bcrypt}', senha)
WHERE senha NOT LIKE '{%';