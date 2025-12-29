// Import Express framework
import express from "express";

// Import user controller functions
import {
  getUsers,
  getUser,
  addUser,
  editUser,
  removeUser,
  getUsersCount,
} from "../controllers/userController.js";

// Create Express router instance
const router = express.Router();

// Route: Get all users
router.get("/", getUsers);

// Route: Get a single user by ID
router.get("/get/:id", getUser);

// Route: Create a new user
router.post("/add", addUser);

// Route: Update an existing user by ID
router.put("/update/:id", editUser);

// Route: Delete a user by ID
router.delete("/delete/:id", removeUser);

// Route: Get total number of users
router.get("/count", getUsersCount);

// Export router to be used in the main app
export default router;
