// Import task-related database model functions
import {
  getAllTasks,
  getMostRecentTask,
  getDoneTasks,
} from "../models/taskModels.js";

// Controller: Fetch all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Controller: Fetch the most recently created task
export const getRecentTask = async (req, res) => {
  try {
    const task = await getMostRecentTask();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recent task" });
  }
};

// Controller: Fetch all completed (done) tasks
export const getDoneTasksController = async (req, res) => {
  try {
    const tasks = await getDoneTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch done tasks" });
  }
};
