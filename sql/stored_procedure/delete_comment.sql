DELIMITER //
CREATE PROCEDURE delete_comment(IN p_id INT)
BEGIN
    DELETE FROM comments WHERE id = p_id;
END //
DELIMITER ;