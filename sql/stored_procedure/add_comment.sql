DELIMITER //
CREATE PROCEDURE add_comment(
    IN p_blog_id INT,
    IN p_user_id INT,
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_message TEXT
)
BEGIN
    INSERT INTO comments (blog_id, user_id, name, email, message)
    VALUES (p_blog_id, p_user_id, p_name, p_email, p_message);
END //
DELIMITER ;