-- Get all tasks
select * from task

--How many tasks are in the task table?
select count(*) as total_tasks from task


--How many tasks in the task table do not have a valid due date?
select count(*) as invalid_due_dates from task where due_date is null


--Find all the tasks that are marked as done.
--option 1 (excluded user_id=null) (total=10)

select title, description, status_id ,user_id,status.name  from task 
join user on task.user_id=user.id
join status on task.status_id=status.id where task.status_id = 3

--option 2 (included user_id=null) (total=11)

select  title, description, status_id ,user_id,status.name  from task
join status on  task.status_id=status.id
where status_id=3



--Find all the tasks that are not marked as done.
--option1 (excluded user_id=null) (total=23)

select title, description, status_id ,user_id,status.name  from task 
join user on task.user_id=user.id
join status on task.status_id=status.id where task.status_id in (1, 2)

--option 2 (included user_id=null) (total=24)

select title, description,status_id ,user_id, status.name  from task 
join status on task.status_id=status.id where task.status_id in (1, 2)



--Get all the tasks, sorted with the most recently created first.
select * from task order by created desc


--Get the single most recently created task.
select * from task order by created desc limit 1


--Get the title and due date of all tasks where the title or description contains database
select title, due_date from task 
where title like '%database%' or description like '%database%'


--Get the title and status (as text) of all tasks.
select task.title, status.name from task join status on task.status_id=status.id


--Get the name of each status, along with a count of how many tasks have that status.
select status.name, count(task.status_id) from task 
join status ON task.status_id=status.id
group by status.name


--Get the names of all statuses, sorted by the status with most tasks first.
select status.name, count(task.status_id) from task 
join status on task.status_id=status.id
group by status.name
order by count(task.status_id) desc;