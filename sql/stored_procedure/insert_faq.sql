DELIMITER //
CREATE PROCEDURE insert_faq(
    IN p_question TEXT,
    IN p_answer TEXT
)
BEGIN
    INSERT INTO faqs (question, answer) 
    VALUES (p_question, p_answer);
END //
DELIMITER ;
