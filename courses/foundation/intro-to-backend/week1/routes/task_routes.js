import express from "express";
import {
  getAllTasks,
  getMostRecentTask,
  getDoneTasks,
} from "../models/task_models.js";

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Recently created task
router.get("/recent", async (req, res) => {
  try {
    const task = await getMostRecentTask();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recent task" });
  }
});

// All done tasks
router.get("/done", async (req, res) => {
  try {
    const tasks = await getDoneTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch done tasks" });
  }
});

export default router;
