DELIMITER //
CREATE PROCEDURE update_comment(
    IN p_id INT,
    IN p_message TEXT
)
BEGIN
    UPDATE comments
    SET message = p_message
    WHERE id = p_id;
END //
DELIMITER ;