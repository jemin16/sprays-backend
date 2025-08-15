DELIMITER //
CREATE PROCEDURE getBlogs()
BEGIN
    SELECT b.*, COUNT(c.id) AS comment_count
    FROM blogs b
    LEFT JOIN comments c ON b.id = c.blog_id
    GROUP BY b.id
    ORDER BY b.created_at DESC;
END //
DELIMITER ;