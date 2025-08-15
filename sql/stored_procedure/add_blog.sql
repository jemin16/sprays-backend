DELIMITER //
CREATE PROCEDURE addBlog(
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
    INSERT INTO blogs (image, stored_key, published_date, tag, title, description, short_desc, short_desc2, single_img, quote)
    VALUES (p_image, p_stored_key, p_published_date, p_tag, p_title, p_description, p_short_desc, p_short_desc2, p_single_img, p_quote);
END //
DELIMITER ;