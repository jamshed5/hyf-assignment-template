-- user table
--CREATE TABLE user (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    name TEXT NOT NULL,
--    email TEXT NOT NULL UNIQUE,
--    phone TEXT
--);


--status table
--CREATE TABLE status (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    name TEXT NOT NULL UNIQUE
--);


--tasks table
--CREATE TABLE task (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    title TEXT NOT NULL,
--    description TEXT,
--    created DATETIME NOT NULL,
--    updated DATETIME NOT NULL,
--    due_date DATETIME,
--    status_id INTEGER NOT NULL DEFAULT 1,
--    FOREIGN KEY (status_id) REFERENCES status(id)
--);


-- add users
--INSERT INTO user (name, email, phone) VALUES ('Aarika Ellingworth', 'aellingworth0@harvard.edu', '483-396-8795');
--INSERT INTO user (name, email, phone) VALUES ('Pren Goldsworthy', 'pgoldsworthy1@spotify.com', '635-572-8467');
--INSERT INTO user (name, email, phone) VALUES ('Pablo Kisbee', 'pkisbee2@lulu.com', '790-962-8683');
--INSERT INTO user (name, email, phone) VALUES ('Rodie Duncan', 'rduncan3@quantcast.com', '646-743-6191');
--INSERT INTO user (name, email, phone) VALUES ('Aubry Polak', 'apolak4@indiatimes.com', '302-678-7931');
--INSERT INTO user (name, email, phone) VALUES ('Maryrose Meadows', 'mmeadows5@comcast.net', '251-524-6594');
--INSERT INTO user (name, email, phone) VALUES ('Pavel Brushneen', 'pbrushneen6@techcrunch.com', '316-170-3640');
--INSERT INTO user (name, email, phone) VALUES ('Hedy Gerault', 'hgerault7@nymag.com', '176-177-5579');
--INSERT INTO user (name, email, phone) VALUES ('王秀英', 'wang.xiuying@weebly.com', '891-952-6749');
--INSERT INTO user (name, email, phone) VALUES ('إلياس', 'elias@github.com', '202-517-6983');
--INSERT INTO user (name, email, phone) VALUES ('Donald Duck', 'donald@duck.com', NULL);


-- add status
--INSERT INTO status (name) VALUES ('Not started'), ('In progress'), ('Done');


--add tasks
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Wash clothes', 'Title says it all.', '2017-10-25 06:54:16', '2017-10-15 13:05:09', null, 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Become a billionaire', 'This should not take long, just invent a time machine, travel back to 2010 and buy bitcoin', '2017-09-26 03:06:46', '2017-10-08 06:14:31', '2017-12-22 20:58:03', 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Plan meeting with London office', 'We will probably use skype', '2017-10-04 18:07:37', '2017-10-14 16:01:31', '2017-12-05 19:42:15', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Order groceries online', 'The fridge is almost empty, we need eggs and milk', '2017-09-20 19:34:43', '2017-10-15 23:35:45', '2017-12-24 16:00:46', 1);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Empty the mailbox', NULL, '2017-09-27 15:17:08', '2017-10-08 17:31:16', null, 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Fix the flat tire on the bike', 'Tools are in the garage', '2017-09-13 23:16:30', '2017-10-06 04:03:52', '2017-12-07 11:51:11', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Wash the car', NULL, '2017-10-06 19:39:16', '2017-10-03 04:49:05', '2017-12-04 17:43:16', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Walk the dog', NULL, '2017-09-03 02:47:17', '2017-10-12 18:40:08', null, 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Write a book', 'Maybe something about dragons?', '2017-10-11 06:14:01', '2017-10-17 12:19:08', '2017-12-21 20:18:05', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Do HackYourFuture assignment', NULL, '2017-10-04 13:55:16', '2017-10-10 00:18:05', '2017-12-19 17:01:10', 1);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Iron shirts', NULL, '2017-09-23 03:59:58', '2017-10-19 08:30:48', '2017-12-08 11:00:35', 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Water the potted plants', 'Maybe they need fertilizer as well', '2017-09-29 23:38:42', '2017-10-08 04:24:53', null, 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Buy wine for the birthday party', 'Both red and white wine', '2017-10-10 14:57:22', '2017-10-14 14:03:30', '2017-12-10 23:43:56', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Buy gift for Paul', 'He could use a shirt or a tie and some socks', '2017-09-09 05:22:08', '2017-10-17 15:58:05', '2017-12-04 20:45:18', 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Change lightbulb in hallway', 'Should be an LED bulb', '2017-10-01 19:07:35', '2017-10-03 10:02:27', '2017-12-08 17:09:03', 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Wash windows', NULL, '2017-10-02 22:15:17', '2017-10-07 22:31:35', '2017-12-06 03:36:09', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Setup salary databases for accounting', 'Use MySQL', '2017-10-25 05:35:33', '2017-10-10 23:22:33', '2017-12-05 00:19:08', 1);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Learn how databases work', NULL, '2017-09-06 03:16:47', '2017-10-10 16:56:58', '2017-12-18 05:08:05', 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Make the databases perform better', 'It should be possible to optimize the indexes', '2017-10-03 09:27:20', '2017-10-01 16:27:46', '2017-12-01 13:28:35', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Buy beer for the company party', '2 or 3 cases should be enough', '2017-10-08 01:39:02', '2017-10-13 23:07:41', null, 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Knit sweater', NULL, '2017-09-22 17:14:55', '2017-10-08 09:01:35', '2017-12-15 20:33:57', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Charge electric bicycle', 'It sucks to ride it without a battery!', '2017-10-10 12:25:07', '2017-10-07 21:45:01', '2017-12-10 19:02:17', 1);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Buy new phone', 'The battery in the current one only lasts 5 hours 😞', '2017-09-17 00:25:34', '2017-10-09 11:48:12', null, 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Ride bike around Sjælland', 'Remember rainclothes and tire repair kit!', '2017-10-20 19:21:13', '2017-10-07 01:38:06', '2017-12-19 15:08:18', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Look at apartments in Ørestad', '2 or 3 rooms', '2017-10-30 09:47:00', '2017-10-19 06:11:26', null, 1);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Empty Mr Fluffy''s litterbox', NULL, '2017-09-28 03:09:06', '2017-10-13 10:38:34', '2017-12-20 23:37:18', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Buy new dining room table and chairs', 'Ikea has some on sale', '2017-09-21 12:02:34', '2017-10-02 02:05:11', '2017-12-06 00:14:30', 1);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Renew buscard', '3 zones', '2017-10-07 22:47:51', '2017-10-09 15:50:03', '2017-12-01 14:25:40', 2);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Sign up for linkedin', 'Make the CV awesome! 😄', '2017-09-04 00:57:47', '2017-10-18 18:07:48', '2017-12-07 23:04:38', 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Remove facebook from phone', 'To avoid interruptions when working', '2017-10-26 17:15:07', '2017-10-13 03:36:47', '2017-12-19 11:10:02', 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Backup databases to external disk', 'Remember to store the disk in another physical location', '2017-09-09 17:32:33', '2017-10-01 21:18:59', '2017-12-23 14:21:01', 1);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Put up the new lamp in the hallway', NULL, '2017-10-15 05:45:54', '2017-10-16 14:05:35', '2017-12-29 02:29:26', 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Hang up paintings in living room', NULL, '2017-09-10 05:36:11', '2017-10-09 17:40:42', null, 3);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Buy plane ticket to Auckland', 'Check prices online first!', '2017-09-05 09:07:22', '2017-10-15 09:36:06', '2017-12-07 11:10:05', 1);
--INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Learn about NoSQL databases', 'MongoDB, CouchDB, etc.', '2017-10-20 01:41:53', '2017-10-04 07:19:56', '2017-12-23 10:13:42', 2);


--junction table
--M:M
--One user can have many tasks
--One task can belong to many users
--CREATE TABLE user_task (
--    user_id INTEGER NOT NULL,
--    task_id INTEGER NOT NULL,
--    PRIMARY KEY (user_id, task_id),
--    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
--    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE
--);
-- 

-- users-tasks
--INSERT INTO user_task (user_id, task_id) VALUES(1, 5);
--INSERT INTO user_task (user_id, task_id) VALUES(1, 35);
--INSERT INTO user_task (user_id, task_id) VALUES(1, 11);
--INSERT INTO user_task (user_id, task_id) VALUES(2, 4);
--INSERT INTO user_task (user_id, task_id) VALUES(2, 26);
--INSERT INTO user_task (user_id, task_id) VALUES(2, 29);
--INSERT INTO user_task (user_id, task_id) VALUES(3, 22);
--INSERT INTO user_task (user_id, task_id) VALUES(3, 13);
--INSERT INTO user_task (user_id, task_id) VALUES(3, 19);
--INSERT INTO user_task (user_id, task_id) VALUES(4, 24);
--INSERT INTO user_task (user_id, task_id) VALUES(4, 20);
--INSERT INTO user_task (user_id, task_id) VALUES(5, 20);
--INSERT INTO user_task (user_id, task_id) VALUES(5, 18);
--INSERT INTO user_task (user_id, task_id) VALUES(5, 15);
--INSERT INTO user_task (user_id, task_id) VALUES(6, 10);
--INSERT INTO user_task (user_id, task_id) VALUES(6, 7);
--INSERT INTO user_task (user_id, task_id) VALUES(6, 27);
--INSERT INTO user_task (user_id, task_id) VALUES(7, 33);
--INSERT INTO user_task (user_id, task_id) VALUES(7, 18);
--INSERT INTO user_task (user_id, task_id) VALUES(7, 23);
--INSERT INTO user_task (user_id, task_id) VALUES(8, 26);
--INSERT INTO user_task (user_id, task_id) VALUES(8, 30);
--INSERT INTO user_task (user_id, task_id) VALUES(8, 11);
--INSERT INTO user_task (user_id, task_id) VALUES(9, 34);
--INSERT INTO user_task (user_id, task_id) VALUES(9, 15);
--INSERT INTO user_task (user_id, task_id) VALUES(9, 1);
--INSERT INTO user_task (user_id, task_id) VALUES(10, 29);
--INSERT INTO user_task (user_id, task_id) VALUES(10, 16);
--INSERT INTO user_task (user_id, task_id) VALUES(10, 1);
--INSERT INTO user_task (user_id, task_id) VALUES(11, 26);
--INSERT INTO user_task (user_id, task_id) VALUES(11, 27);
--INSERT INTO user_task (user_id, task_id) VALUES(11, 17);
--INSERT INTO user_task (user_id, task_id) VALUES(11, 2);
--INSERT INTO user_task (user_id, task_id) VALUES(1, 3);
--INSERT INTO user_task (user_id, task_id) VALUES(2, 6);
--INSERT INTO user_task (user_id, task_id) VALUES(3, 8);
--INSERT INTO user_task (user_id, task_id) VALUES(4, 9);
--INSERT INTO user_task (user_id, task_id) VALUES(5, 12);
--INSERT INTO user_task (user_id, task_id) VALUES(6, 14);
--INSERT INTO user_task (user_id, task_id) VALUES(7, 21);
--INSERT INTO user_task (user_id, task_id) VALUES(8, 25);
--INSERT INTO user_task (user_id, task_id) VALUES(9, 28);
--INSERT INTO user_task (user_id, task_id) VALUES(10, 31);
--INSERT INTO user_task (user_id, task_id) VALUES(11, 32);

--------------------------------------Part 1--------------------------------------

--1. Insert a new user with your own name and email

--INSERT INTO user (name, email, phone)
--VALUES ('ali', 'ali@gmail.com', '000-00000');

--2. Insert a new task assigned to yourself with the following attributes:
--    Title: "Learn SQL"
--    Description: "Practice database queries"
--    Status: "In Progress"
--    Due date: One week from today

-- step 1 (get status_id)
-- SELECT id FROM status WHERE name = 'In progress'; -- get 2

-- step 2 (create task)
--INSERT INTO task (title, description, created, updated, due_date, status_id)
--VALUES (
--    'Learn SQL',
--    'Practice database queries',
--    DATETIME('now'),
--    DATETIME('now'),
--    DATETIME('now', '+7 days'),
--    2
--);

-- step 3 (assign to me) 
-- Point: one user can have 2 post with same title so the solution is :ORDER BY id DESC LIMIT 1, but the title of the task should be unique (this requirment didnt mentioned in assignment))
--INSERT INTO user_task (user_id, task_id)
--VALUES (
--    (SELECT id FROM user WHERE email = 'ali@gmail.com'),
--    (SELECT id FROM task WHERE title = 'Learn SQL' ORDER BY id DESC LIMIT 1)
--);


--3. Update the title of the task you just created to "Master SQL Basics"
--UPDATE task
--SET title = 'Master SQL Basics'
--WHERE title = 'Learn SQL';

--4. Change the due date of your task to two weeks from today
--UPDATE task
--SET due_date = DATETIME('now', '+14 days')
--WHERE title = 'Master SQL Basics';

--5. Change the status of your task to "Done"

-- step1
--SELECT id FROM status WHERE name = 'Done';

-- step2
--UPDATE task
--SET status_id = 3
--WHERE title = 'Master SQL Basics';

--6. Delete one of the tasks in the database (choose any task)
--DELETE FROM task
--WHERE id = 1;

--------------------------------------Part 2--------------------------------------

--1. List all users who don't have any tasks assigned

--SELECT u.*
--FROM user u
--LEFT JOIN user_task ut ON u.id = ut.user_id
--WHERE ut.user_id IS NULL;

--2. Find all tasks with a status of "Done"

--SELECT t.*
--FROM task t
--JOIN status s ON t.status_id = s.id
--WHERE s.name = 'Done';

--3. Find all overdue tasks (due_date is earlier than today)

--SELECT *
--FROM task
--WHERE due_date IS NOT NULL
--AND due_date < DATE('now');

--------------------------------------Part 3--------------------------------------

--1. Add a new column called priority to the task table with possible values: 'Low', 'Medium', 'High'. 💡 Remember to provide default values.

--ALTER TABLE task
--ADD COLUMN priority TEXT NOT NULL DEFAULT 'Medium';

--2. Update some existing tasks to have different priority values

--UPDATE task SET priority = 'High' WHERE title LIKE '%database%';
--UPDATE task SET priority = 'Low' WHERE status_id = 3;

--3. Create a new table called category with columns:
--    id (PRIMARY KEY)
--    name (e.g., "Work", "Personal", "Study")
--    color (e.g., "red", "blue", "green")

--CREATE TABLE category (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    name TEXT NOT NULL UNIQUE,
--    color TEXT NOT NULL
--);

--4. Create a linking table called task_category to establish a many-to-many relationship between tasks and categories:
--    task_id (FOREIGN KEY to task.id)
--    category_id (FOREIGN KEY to category.id)

--CREATE TABLE task_category (
--    task_id INTEGER NOT NULL,
--    category_id INTEGER NOT NULL,
--    PRIMARY KEY (task_id, category_id),
--    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
--    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
--);

--5. Insert at least 3 categories

--INSERT INTO category (name, color) VALUES ('Work', 'red');
--INSERT INTO category (name, color) VALUES ('Personal', 'blue');
--INSERT INTO category (name, color) VALUES ('Study', 'green');

--6. Assign categories to at least 5 different tasks
-- simple approach 
--INSERT INTO task_category (task_id, category_id) VALUES (1, 1);
--INSERT INTO task_category (task_id, category_id) VALUES (2, 1);
--INSERT INTO task_category (task_id, category_id) VALUES (3, 3);
--INSERT INTO task_category (task_id, category_id) VALUES (4, 2);
--INSERT INTO task_category (task_id, category_id) VALUES (5, 3);

--------------------------------------Part 4--------------------------------------

--1. Find all tasks in a specific category (e.g., "Work") 
--Point: I am getting only one task becuase i a previous query i deleted 1st task

--SELECT t.*
--FROM task t
--JOIN task_category tc ON t.id = tc.task_id
--JOIN category c ON c.id = tc.category_id
--WHERE c.name = 'Work';

--2. List tasks ordered by priority (High to Low) and by due date (earliest first)

--SELECT *
--FROM task
--ORDER BY
--    CASE priority
--        WHEN 'High' THEN 1
--        WHEN 'Medium' THEN 2
--        WHEN 'Low' THEN 3
--        ELSE 4
--    END,
--    due_date ASC;

--3. Find which category has the most tasks

--SELECT c.name, COUNT(tc.task_id) AS task_count
--FROM category c
--JOIN task_category tc ON c.id = tc.category_id
--GROUP BY c.id
--ORDER BY task_count DESC
--LIMIT 1;

--4. Get all high priority tasks that are either "In Progress" or "To Do"

--SELECT t.*
--FROM task t
--JOIN status s ON t.status_id = s.id
--WHERE t.priority = 'High'
--AND s.name IN ('In progress', 'Not started');

--5. Find users who have tasks in more than one category
--SELECT u.id, u.name
--FROM user u
--JOIN user_task ut ON u.id = ut.user_id
--JOIN task_category tc ON ut.task_id = tc.task_id
--GROUP BY u.id
--HAVING COUNT(DISTINCT tc.category_id) > 1;



 Assignment week2 
Part A: Aggregate Functions & Reporting

--Count the total number of tasks in the database
SELECT COUNT(*) AS total_tasks
FROM task;

--Count how many tasks each user has been assigned (include users with zero tasks)
SELECT u.id, u.name, COUNT(ut.task_id) AS task_count
FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
GROUP BY u.id, u.name;

--Find the number of tasks per status (e.g., how many are "To Do", "In Progress", "Done")
SELECT s.name AS status, COUNT(t.id) AS task_count
FROM status s
LEFT JOIN task t ON s.id = t.status_id
GROUP BY s.id, s.name;

--Find the user who has the most tasks assigned
SELECT u.id, u.name, COUNT(ut.task_id) AS task_count
FROM user u
JOIN user_task ut ON u.id = ut.user_id
GROUP BY u.id, u.name
ORDER BY task_count DESC
LIMIT 1;

--Calculate the average number of tasks per user (only count users who have at least one task)
SELECT AVG(task_count) AS avg_tasks_per_user
FROM (
    SELECT u.id, COUNT(ut.task_id) AS task_count
    FROM user u
    JOIN user_task ut ON u.id = ut.user_id
    GROUP BY u.id
) sub;

--Find the earliest and latest due date across all tasks
SELECT 
    MIN(due_date) AS earliest_due_date,
    MAX(due_date) AS latest_due_date
FROM task
WHERE due_date IS NOT NULL;

--List each category along with the number of tasks it contains, ordered from most to least tasks
select c.name as name,count(tc.task_id) AS task_count
from category c
join task_category tc on c.id = tc.category_id
join task t on tc.task_id = t.id
group by c.id, c.name
order by task_count DESC;

--Find all users who have more than 2 tasks assigned to them
SELECT u.id, u.name, COUNT(ut.task_id) AS task_count
FROM user u
JOIN user_task ut ON u.id = ut.user_id
GROUP BY u.id, u.name
HAVING COUNT(ut.task_id) > 2;


--Part B: SQL Injection

1. Spot the Vulnerability (explaination under commented)
-- If userName = ' OR '1'='1
-- The query becomes:
--
-- SELECT * FROM task 
-- WHERE user_id = (
--   SELECT id FROM user WHERE name = '' OR '1'='1'
-- );
--
-- Explanation:
-- '1'='1' is always TRUE, so the WHERE clause becomes:
-- name = '' OR TRUE
--
-- This makes the subquery return ALL user ids (not just one).
-- Depending on the database, this may:
-- - Return the first matching id
-- - Or cause unexpected behavior
--
-- Result:
-- The attacker can bypass the intended filter and retrieve tasks 
-- that they should not have access to.
--
-- Why dangerous:
-- It proves the query is vulnerable. Once an attacker can manipulate 
-- the logic, they can escalate to more harmful actions (like deletion).

2. Fix the Vulnerability ((explaination under commented))
-- function getTasksByUser(userName) {
--   const query = `
--     SELECT * FROM task 
--     WHERE user_id = (
--       SELECT id FROM user WHERE name = ?
--     )
--   `;
--   db.all(query, [userName], (err, rows) => console.log(rows));
-- }
-- Explanation:
-- 1. The '?' is a placeholder (parameter).
-- 2. The actual value of userName is passed separately in the array [userName].
-- 3. The database treats this value strictly as DATA, not executable SQL.
-- 4. Even if userName contains malicious input like:
--    ' OR '1'='1 or '; DELETE FROM task; 
--   it will NOT change the structure of the query.


-- Part C: Transactions

-- Part -1
-- Reassign all tasks from one user to another, then delete the original user
BEGIN TRANSACTION;

-- Move all task assignments from old user (e.g., user_id = 1)
-- to new user (e.g., user_id = 2)
UPDATE user_task
SET user_id = 2
WHERE user_id = 1;

-- Delete the old user
DELETE FROM user
WHERE id = 1;

COMMIT;

-- Explanation:
-- 1. All rows in user_task pointing to user 1 are reassigned to user 2
-- 2. Then user 1 is deleted
-- 3. If anything fails, the transaction can be rolled back


-- Demonstrate rollback by forcing an error

-- Part -2
BEGIN TRANSACTION;
--
---- Step 1: Reassign tasks
UPDATE user_task
SET user_id = 2
WHERE user_id = 1;
--
---- Step 2: Force an error (invalid foreign key)
---- status_id = 999 does not exist in the status table
INSERT INTO task (title, created, updated, status_id)
VALUES ('This will fail', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 999);
--
---- If the above fails, rollback everything
ROLLBACK;
--
---- Explanation:
---- 1. Tasks are reassigned (temporarily)
---- 2. INSERT fails due to foreign key constraint
---- 3. ROLLBACK undoes the UPDATE
---- 4. Final state: NOTHING changed

--Part D: Putting It All Together
--Part -1(Create “Urgent” category plus assign tasks)
BEGIN TRANSACTION;
--
INSERT INTO category (name, color)
VALUES ('Urgent', 'orange');
--
INSERT INTO task_category (task_id, category_id)
SELECT t.id, c.id
FROM task t
JOIN status s ON t.status_id = s.id
JOIN category c ON c.name = 'Urgent'
WHERE s.name IN ('Not started', 'In progress')
AND NOT EXISTS (
    SELECT 1 FROM task_category tc
    WHERE tc.task_id = t.id AND tc.category_id = c.id
);
--
COMMIT;

--Dashboard summary
SELECT
    COUNT(*) AS total_tasks,

    SUM(CASE 
        WHEN status_id = (SELECT id FROM status WHERE name = 'Done') 
        THEN 1 ELSE 0 
    END) AS completed_tasks,

    SUM(CASE 
        WHEN due_date IS NOT NULL AND due_date < DATE('now') 
        THEN 1 ELSE 0 
    END) AS overdue_tasks,

    (
        SELECT COUNT(DISTINCT user_id)
        FROM user_task
    ) AS users_with_tasks

FROM task;