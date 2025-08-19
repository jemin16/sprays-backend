DELIMITER //
CREATE PROCEDURE delete_faq(
    IN p_id INT
)
BEGIN
    DELETE FROM faqs WHERE id = p_id;
END //
DELIMITER ;