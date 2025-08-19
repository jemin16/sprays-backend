DELIMITER //
CREATE PROCEDURE update_faq(
    IN p_id INT,
    IN p_question TEXT,
    IN p_answer TEXT
)
BEGIN
    UPDATE faqs 
    SET question = p_question, answer = p_answer
    WHERE id = p_id;
END //
DELIMITER ;