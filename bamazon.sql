

DROP DATABASE if exists bamazondb;
CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100),
department_name VARCHAr(100),
price INTEGER(60) NULL,
stock_quantity INTEGER(50) NULL,
PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('mac-lipgloss', 'health&beauty', 35.00, 50),
			('aveeno-lotion', 'health&beauty', 20.00, 30),
            ('night-cream', 'health&beauty', 45.00, 40),
            ('exfoliator', 'health&beauty', 43.00, 35),
            ('mascara', 'health&beauty', 15.00, 35),
            ('foundation', 'health&beauty', 25.00, 35),
            ('blush', 'health&beauty', 30.00, 40),
            ('highlighter', 'health&beauty', 45.00, 50),
            ('eyeliner', 'health&beauty', 12.00, 50),
            ('eye-shadow', 'health&beauty', 23.00, 45);
            
SELECT * FROM products;
