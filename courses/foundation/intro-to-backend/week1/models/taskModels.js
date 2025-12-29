// Import database connection
import db from "../db/db_connection.js";

// Model: Fetch all tasks
export const getAllTasks = async () => {
  // Execute raw SQL to get all tasks
  const rows = await db.raw("SELECT * FROM task");
  return rows;
};

// Model: Fetch the most recently created task
export const getMostRecentTask = async () => {
  // Execute raw SQL to get the latest task by creation date
  const row = await db.raw("SELECT * FROM task ORDER BY created DESC LIMIT 1");
  return row;
};

// Model: Fetch all completed (done) tasks with status and user info
export const getDoneTasks = async () => {
  // Execute raw SQL to get tasks where status_id = 3
  // Join with user and status tables to get extra details
  const rows = await db.raw(`
    SELECT 
      task.title,
      task.description,
      task.status_id,
      task.user_id,
      status.name AS status_name
    FROM task
    JOIN user ON task.user_id = user.id
    JOIN status ON task.status_id = status.id
    WHERE task.status_id = 3
  `);

  return rows;
};
