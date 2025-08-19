DELIMITER //
CREATE PROCEDURE get_comments_by_blogId(IN p_blog_id INT)
BEGIN
    SELECT * FROM comments WHERE blog_id = p_blog_id ORDER BY created_at DESC;
END //
DELIMITER ;