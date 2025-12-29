// Import user-related database model functions
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserCount,
} from "../models/userModels.js";

// Controller: Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Controller: Fetch a single user by ID
export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    // Return 404 if user does not exist
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Controller: Create a new user
export const addUser = async (req, res) => {
  const { name, email } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    await createUser(name, email);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

// Controller: Update an existing user
export const editUser = async (req, res) => {
  const { name, email } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const user = await updateUser(req.params.id, name, email);
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Controller: Delete a user by ID
export const removeUser = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Controller: Get total number of users
export const getUsersCount = async (req, res) => {
  try {
    const count = await getUserCount();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user count" });
  }
};
