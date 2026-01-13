// Import Express framework
import express from "express";

// Import task controller functions
import {
  getTasks,
  getRecentTask,
  getDoneTasksController,
} from "../controllers/taskController.js";

// Create Express router instance
const router = express.Router();

// Route: Get all tasks
router.get("/", getTasks);

// Route: Get the most recently created task
router.get("/recent", getRecentTask);

// Route: Get all completed (done) tasks
router.get("/done", getDoneTasksController);

// Export router to be used in the main app
export default router;
