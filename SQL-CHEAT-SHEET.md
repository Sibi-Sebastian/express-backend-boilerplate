SQL cheat sheet:


PRIMARY KEY:  
CREATE TABLE users ( id INT PRIMARY KEY, name VARCHAR(100) );

FOREIGN KEY:
CREATE TABLE orders ( id INT PRIMARY KEY, user_id INT, FOREIGN KEY (user_id) REFERENCES users(id) );

UNIQUE:
CREATE TABLE users ( email VARCHAR(255) UNIQUE );

NOT NULL:
CREATE TABLE products ( name VARCHAR(100) NOT NULL );

DEFAULT:
CREATE TABLE users (status VARCHAR(20) DEFAULT 'ACTIVE' );

CHECK:
CREATE TABLE products ( price DECIMAL(10,2), CHECK (price > 0) );


Index Management


CREATE INDEX:
Used to improve query performance.
CREATE INDEX index_name ON table_name(column_name);
CREATE INDEX idx_users_email ON users(email);

CREATE UNIQUE INDEX:
Ensures column values remain unique.
CREATE UNIQUE INDEX index_name ON table_name(column_name);
CREATE UNIQUE INDEX idx_unique_email ON users(email);

DROP INDEX:
Removes an index.
DROP INDEX index_name ON table_name;
DROP INDEX idx_users_email ON users;

EXISTS Clause:
Used to check if a subquery returns any rows.
SELECT column(s) FROM table_name WHERE EXISTS (subquery);
SELECT * FROM users WHERE EXISTS ( SELECT 1 FROM orders orders.user_id = users.id );

OFFSET (Pagination):
Used with LIMIT for pagination.
SELECT column(s) FROM table_name LIMIT number OFFSET number;
SELECT * FROM products LIMIT 10 OFFSET 20;


Window Functions:


ROW_NUMBER()
Assigns a unique row number.
SELECT name, price, ROW_NUMBER() OVER (ORDER BY price DESC) AS row_number FROM products;

RANK:
Assigns rank with possible gaps.
SELECT name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products; DENSE_RANK()
SELECT name, price, DENSE_RANK() OVER (ORDER BY price DESC) AS dense_rank FROM products;

PARTITION BY:
Used to group rows inside window functions.
SELECTuser_id, order_amount, RANK() OVER (PARTITION BY user_id ORDER BY order_amount DESC) AS order_rank FROM orders; 

Views:
Views are saved queries.
CREATE VIEW CREATE VIEW view_name AS SELECT column(s) FROM table_name;
CREATE VIEW user_orders AS SELECT users.name, orders.total FROM users JOIN orders ON users.id = orders.user_id; Use View SELECT * FROM user_orders;

DROP VIEW:
DROP VIEW view_name;
DROP VIEW user_orders;


Stored Procedures

CREATE PROCEDURE:

DELIMITER //
CREATE PROCEDURE procedure_name() BEGIN SQL statements;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetUsers() BEGIN SELECT * FROM users;
END //
DELIMITER ;


CALL PROCEDURE:
CALL procedure_name();
CALL GetUsers();

DROP PROCEDURE:
DROP PROCEDURE procedure_name;
DROP PROCEDURE GetUsers;


SHOW TABLES:
SHOW TABLES;

DESCRIBE TABLE:
DESCRIBE table_name;
DESCRIBE users;

SHOW COLUMNS:
SHOW COLUMNS FROM table_name;
SHOW COLUMNS FROM users;

SHOW INDEX:
SHOW INDEX FROM table_name;
SHOW INDEX FROM users;

SHOW CREATE TABLE:
SHOW CREATE TABLE table_name;
SHOW CREATE TABLE users;


Data Manipulation Language (DML) Commands


SELECT:
SELECT column1, column2 FROM table_name;
SELECT first_name, last_name FROM customers;

INSERT
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
INSERT INTO customers (first_name, last_name) VALUES ('Mary', 'Doe');

UPDATE
UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
UPDATE employees SET employee_name = ‘John Doe’, department = ‘Marketing’;

DELETE
DELETE FROM table_name WHERE condition;
DELETE FROM employees WHERE employee_name = ‘John Doe’;


Data Definition Language (DDL) Commands


CREATE
CREATE TABLE table_name (column1 datatype1, column2 datatype2, .);
CREATE TABLE employees ( employee_id INT PRIMARY KEY, first_name VARCHAR(50), last_name VARCHA (50), age INT );

ALTER
ALTER TABLE table_name ADD column_name datatype;
ALTER TABLE customers ADD email VARCHAR(100);

DROP
DROP TABLE table_name;
DROP TABLE customers;

TRUNCATE
TRUNCATE TABLE table_name;
TRUNCATE TABLE customers;


Data Control Language (DCL) Commands

GRANT
GRANT SELECT, INSERT ON table_name TO user_name;
GRANT SELECT, INSERT ON employees TO ‘John Doe’;

REVOKE
REVOKE SELECT, INSERT ON table_name FROM user_name;
REVOKE SELECT, INSERT ON employees FROM ‘John Doe’;


Querying Data Commands


SELECT Statement
SELECT column1, column2 FROM table_name;
SELECT first_name, last_name FROM customers;

WHERE Clause 
SELECT * FROM table_name WHERE condition;
SELECT * FROM customers WHERE age > 30;

ORDER BY Clause 
SELECT * FROM table_name ORDER BY column_name ASC|DESC;
SELECT * FROM products ORDER BY price DESC;

GROUP BY Clause 
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name;
SELECT category, COUNT(*) FROM products GROUP BY category;

HAVING Clause 
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name HAVING condition;
SELECT category, COUNT(*) FROM products GROUP BY category HAVING COUNT(*) > 5;

INNER JOIN 
SELECT * FROM table1 INNER JOIN table2 ON table1.column = table2.column;
SELECT * FROM employees INNER JOIN departments ON employees.department_id = departments.id;

LEFT JOIN/LEFT OUTER JOIN 
SELECT * FROM table1 LEFT JOIN table2 ON table1.column = table2.column;
SELECT * FROM employees LEFT JOIN departments ON employees.department_id = departments.id;

RIGHT JOIN/RIGHT OUTER JOIN
SELECT * FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;
SELECT * FROM employees RIGHT JOIN departments ON employees.department_id = departments.department_id;

FULL JOIN/FULL OUTER JOIN
SELECT * FROM table1 FULL JOIN table2 ON table1.column = table2.column;
SELECT * FROM employees LEFT JOIN departments ON employees.employee_id = departments.employee_id UNION SELECT * FROM employees RIGHT JOIN departments ON employees.employee_id = departments.employee_id;

CROSS JOIN 
SELECT * FROM table1 CROSS JOIN table2;
SELECT * FROM employees CROSS JOIN departments;

SELF JOIN 
SELECT * FROM table1 t1, table1 t2 WHERE t1.column = t2.column;
SELECT * FROM employees t1, employees t2 WHERE t1.employee_id = t2.employee_id;

NATURAL JOIN 
SELECT * FROM table1 NATURAL JOIN table2;
SELECT * FROM employees NATURAL JOIN departments;


Subqueries in SQL


IN
SELECT column(s) FROM table WHERE value IN (subquery);
SELECT * FROM customers WHERE city IN (SELECT city FROM suppliers);

ANY
SELECT column(s) FROM table WHERE value < ANY (subquery);
SELECT * FROM products WHERE price < ANY (SELECT unit_price FROM supplier_products);

ALL
SELECT column(s) FROM table WHERE value > ALL (subquery);
SELECT * FROM orders WHERE order_amount > ALL (SELECT total_amount FROM previous_orders);


Aggregate Functions Commands


COUNT
SELECT COUNT(column_name) FROM table_name;
SELECT COUNT(age) FROM employees;

SUM
SELECT SUM(column_name) FROM table_name;
SELECT SUM(revenue) FROM sales;

AVG
SELECT AVG(column_name) FROM table_name;
SELECT AVG(price) FROM products;

MIN
SELECT MIN(column_name) FROM table_name;
SELECT MIN(price) FROM products;

MAX
SELECT MAX(column_name) FROM table_name;
SELECT MAX(price) FROM products;


String Functions in SQL


CONCAT
SELECT CONCAT(string1, string2, .) AS concatenated_string FROM table_name;
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;

SUBSTRING/SUBSTR
SELECT SUBSTRING(string FROM start_position [FOR length]) AS substring FROM table_name;
SELECT SUBSTRING(product_name FROM 1 FOR 5) AS substring FROM products;

CHAR_LENGTH/LENGTH
SELECT CHAR_LENGTH(string) AS length FROM table_name;
SELECT CHAR_LENGTH(product_name) AS length FROM products; 

UPPER
SELECT UPPER(string) AS uppercase_string FROM table_name;
SELECT UPPER(first_name) AS uppercase_first_name FROM employees;

LOWER
SELECT LOWER(string) AS lowercase_string FROM table_name;
SELECT LOWER(last_name) AS lowercase_last_name FROM employees;

TRIM
SELECT TRIM([LEADING | TRAILING | BOTH] characters FROM string) AS trimmed_string FROM table_name;
SELECT TRIM(TRAILING ' ' FROM full_name) AS trimmed_full_name FROM customers;

LEFT
SELECT LEFT(string, num_characters) AS left_string FROM table_name;
SELECT LEFT(product_name, 5) AS left_product_name FROM products;

RIGHT
SELECT RIGHT(string, num_characters) AS right_string FROM table_name;
SELECT RIGHT(order_number, 4) AS right_order_number FROM orders;

REPLACE
SELECT REPLACE(string, old_substring, new_substring) AS replaced_string FROM table_name;
SELECT REPLACE(description, 'old_string', 'new_string') AS replaced_description FROM product_descriptions;


Date and Time SQL Commands


CURRENT_DATE
SELECT CURRENT_DATE() AS current_date;

CURRENT_TIME
SELECT CURRENT_TIME() AS current_time;

CURRENT_TIMESTAMP
SELECT CURRENT_TIMESTAMP() AS current_timestamp;

DATE_PART
SELECT DATE_PART('part', date_expression) AS extracted_part;
SELECT DATE_PART('year', '2024-04-11') AS extracted_part;

DATE_ADD/DATE_SUB
SELECT DATE_ADD(date_expression, INTERVAL value unit) AS new_date;
SELECT DATE_ADD('2024-04-11', INTERVAL 1 DAY) AS new_date;
SELECT DATE_SUB('2024-04-11', INTERVAL 1 DAY) AS new_date;

EXTRACT
SELECT EXTRACT(part FROM date_expression) AS extracted_part;
SELECT EXTRACT(YEAR FROM '2024-04-11') AS extracted_part;

TO_CHAR
SELECT TO_CHAR(date_expression, 'format') AS formatted_date;
SELECT TO_CHAR('2024-04-11', 'YYYY-MM-DD') AS formatted_date;

TIMESTAMPDIFF
SELECT TIMESTAMPDIFF(unit, timestamp1, timestamp2) AS difference;
SELECT TIMESTAMPDIFF(DAY, '2024-04-10', '2024-04-11') AS difference;

DATEDIFF
SELECT DATEDIFF(date1, date2) AS difference_in_days;
SELECT DATEDIFF('2024-04-11', '2024-04-10') AS difference_in_days;


Conditional Expressions


CASE Statement
SELECT column1, column2, CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE default_result END AS alias FROM table_name;
SELECT order_id, total_amount, CASE WHEN total_amount > 1000 THEN 'High Value Order' WHEN total_amount > 500 THEN 'Medium Value Order' ELSE 'Low Value Order' END AS order_status FROM orders;

IF
SELECT IF(condition, true_value, false_value) AS alias FROM table_name;
SELECT name, age, IF(age > 50, 'Senior', 'Junior') AS employee_category FROM employees;

COALESCE
SELECT COALESCE(value1, value2, .) AS alias FROM table_name;
SELECT COALESCE(first_name, middle_name) AS preferred_name FROM employees;

NULLIF
SELECT NULLIF(expression1, expression2) AS alias FROM table_name;
SELECT NULLIF(total_amount, discounted_amount) AS diff_amount FROM orders;


Set Operations


UNION 
SELECT column1, column2 FROM table1 UNION SELECT column1, column2 FROM table2;
SELECT first_name, last_name FROM customers UNION SELECT first_name, last_name FROM employees;

INTERSECT
SELECT column1, column2 FROM table1 INTERSECT SELECT column1, column2 FROM table2;
SELECT first_name, last_name FROM customers INTERSECT SELECT first_name, last_name FROM employees;

EXCEPT
SELECT column1, column2 FROM table1 EXCEPT SELECT column1, column2 FROM table2;
SELECT first_name, last_name FROM customers EXCEPT SELECT first_name, last_name FROM employees;


Transaction Control Commands


COMMIT
COMMIT;

BEGIN TRANSACTION;
- SQL statements and changes within the transaction
INSERT INTO employees (name, age) VALUES ('Alice', 30);
UPDATE products SET price = 25.00 WHERE category = 'Electronics';
COMMIT;


ROLLBACK
ROLLBACK;

BEGIN TRANSACTION;
- SQL statements and changes within the transaction
INSERT INTO employees (name, age) VALUES ('Bob', 35);
UPDATE products SET price = 30.00 WHERE category = 'Electronics';
ROLLBACK;


SAVEPOINT
SAVEPOINT savepoint_name;

BEGIN TRANSACTION;
INSERT INTO employees (name, age) VALUES ('Carol', 28);
SAVEPOINT before_update;
UPDATE products SET price = 40.00 WHERE category = 'Electronics';
SAVEPOINT after_update;
DELETE FROM customers WHERE age > 60;
ROLLBACK TO before_update;
- At this point, the DELETE is rolled back, but the UPDATE remains.
COMMIT;


ROLLBACK TO SAVEPOINT
ROLLBACK TO SAVEPOINT savepoint_name;

BEGIN TRANSACTION;
INSERT INTO employees (name, age) VALUES ('David', 42);
SAVEPOINT before_update;
UPDATE products SET price = 50.00 WHERE category = 'Electronics';
SAVEPOINT after_update;
DELETE FROM customers WHERE age > 60;
- Rollback to the savepoint before the update ROLLBACK TO SAVEPOINT before_update;
- At this point, the UPDATE is rolled back, but the INSERT remains.
COMMIT;


SET TRANSACTION
SET TRANSACTION [ISOLATION LEVEL { READ COMMITTED | SERIALIZABL E }]

BEGIN TRANSACTION;
- Set the isolation level to READ COMMITTED
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
- SQL statements and changes within the transaction
INSERT INTO employees (name, age) VALUES ('Emily', 35);
UPDATE products SET price = 60.00 WHERE category = 'Electronics';
COMMIT;