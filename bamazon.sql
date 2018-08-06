DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    dept_name VARCHAR(45) NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INT(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("12 Rules for Life", "Books", 15.57, 200),
	("Echo Dot", "Electronics", 49.99, 200),
    ("Roku Express", "Electronics", 29.88, 100),
    ("Girl, Wash Your Face", "Books", 13.79, 100),
    ("Educated", "Books", 16.80, 300),
    ("UNO Card Game", "Toys & Games", 4.99, 50),
    ("Cards Against Humanity", "Toys & Games", 25.00, 45),
	("Fire TV Stick with Alexa Voice Remote", "Electronics", 39.99, 150),
    ("Ring Wi-Fi Enabled Video Doorbell", "Electronics", 99.99, 50),
    ("Nintendo Entertainment System: NES Classic Edition", "Electronics", 59.99, 25);
    
    
   



