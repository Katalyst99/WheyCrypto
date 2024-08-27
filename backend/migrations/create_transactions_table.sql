USE wheycrypto;

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    crypto_id INT NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    transaction_type ENUM('buy', 'sell') NOT NULL,
    price_at_transaction DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (crypto_id) REFERENCES cryptocurrencies(crypto_id)
);
