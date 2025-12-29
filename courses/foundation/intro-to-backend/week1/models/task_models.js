import db from "../db/db_connection.js";

// models
export const getAllTasks = async () => {
  const rows = await db.raw("SELECT * FROM task");
  return rows;
};

export const getMostRecentTask = async () => {
  const row = await db.raw("SELECT * FROM task ORDER BY created DESC LIMIT 1");
  return row;
};

export const getDoneTasks = async () => {
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
