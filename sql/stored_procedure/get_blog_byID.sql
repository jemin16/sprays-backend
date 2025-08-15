DELIMITER //
CREATE PROCEDURE getBlogById(IN blogId INT)
BEGIN
    SELECT b.*, COUNT(c.id) AS comment_count
    FROM blogs b
    LEFT JOIN comments c ON b.id = c.blog_id
    WHERE b.id = blogId
    GROUP BY b.id;
END //
DELIMITER ;