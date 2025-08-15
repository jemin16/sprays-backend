CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    stored_key VARCHAR(255) NOT NULL,
    published_date DATE,
    tag VARCHAR(255) NOT NULL,
    comment_count INT DEFAULT 0,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    short_desc LONGTEXT,
    short_desc2 LONGTEXT,
    single_img VARCHAR(255) NOT NULL,
    quote TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);