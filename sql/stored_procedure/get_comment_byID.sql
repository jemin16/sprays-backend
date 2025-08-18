DELIMITER //
CREATE PROCEDURE get_comment_by_id(IN p_id INT)
BEGIN
    SELECT * FROM comments WHERE id = p_id;
END //
DELIMITER ;