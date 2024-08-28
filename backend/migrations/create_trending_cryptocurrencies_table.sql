USE wheycrypto;

CREATE TABLE trending_cryptocurrencies (
    trending_id INT AUTO_INCREMENT PRIMARY KEY,
    crypto_id INT NOT NULL,
    ranking INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (crypto_id) REFERENCES cryptocurrencies(crypto_id)
);
