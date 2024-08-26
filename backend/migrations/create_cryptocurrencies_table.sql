USE wheycrypto;

CREATE TABLE cryptocurrencies (
    crypto_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    current_price DECIMAL(15, 2) NOT NULL,
    market_cap BIGINT,
    volume_24h BIGINT,
    circulating_supply BIGINT,
    total_supply BIGINT,
    max_supply BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
