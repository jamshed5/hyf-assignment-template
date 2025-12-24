import express from "express";
import db from "../db/db_connection.js";

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const result = await db.raw("SELECT * FROM task");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Recently created task
router.get("/recent", async (req, res) => {
  try {
    const result = await db.raw("SELECT * FROM task ORDER BY created DESC LIMIT 1");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// All done tasks
router.get("/done", async (req, res) => {
  try {
    const result = await db.raw(`
      SELECT title, description, status_id, user_id, status.name
      FROM task
      JOIN user ON task.user_id = user.id
      JOIN status ON task.status_id = status.id
      WHERE task.status_id = 3
    `);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

export default router;
