DELIMITER //
CREATE PROCEDURE updateBlog(
    IN p_id INT,
    IN p_image VARCHAR(255),
    IN p_stored_key VARCHAR(255),
    IN p_published_date DATE,
    IN p_tag VARCHAR(255),
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_short_desc LONGTEXT,
    IN p_short_desc2 LONGTEXT,
    IN p_single_img VARCHAR(255),
    IN p_quote TEXT
)
BEGIN
    UPDATE blogs
    SET image = p_image,
        stored_key = p_stored_key,
        published_date = p_published_date,
        tag = p_tag,
        title = p_title,
        description = p_description,
        short_desc = p_short_desc,
        short_desc2 = p_short_desc2,
        single_img = p_single_img,
        quote = p_quote
    WHERE id = p_id;
END //
DELIMITER ;