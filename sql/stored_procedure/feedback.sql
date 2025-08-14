DELIMITER $$

CREATE PROCEDURE insert_feedback (
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_email VARCHAR(255),
    IN p_phone_number VARCHAR(20),
    IN p_description TEXT
)
BEGIN
    INSERT INTO feedback (first_name, last_name, email, phone_number, description)
    VALUES (p_first_name, p_last_name, p_email, p_phone_number, p_description);
END $$

DELIMITER ;
