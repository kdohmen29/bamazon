DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  id 							INTEGER(11) 			NOT NULL AUTO_INCREMENT,
  product_name		VARCHAR(40) 		NOT NULL,
  department_name VARCHAR(40)		NOT NULL,
  price						INTEGER(10)			NOT NULL,
  quantity					INTEGER(4)			NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantity) values ("XBox One", "Electronics", 300,  100);
INSERT INTO products (product_name, department_name, price, quantity) values ("PS4", "Electronics", 350,  150);
INSERT INTO products (product_name, department_name, price, quantity) values ("PC", "Electronics", 1000,  80);
INSERT INTO products (product_name, department_name, price, quantity) values (" MacBook", "Electronics", 1000,  50);
INSERT INTO products (product_name, department_name, price, quantity) values (" Sweatshirt", "Clothoes", 20,  200);





SELECT * FROM products;
