import express from "express";
import db from "../db/db_connection.js";

const router = express.Router();

// Get all users in descending order
router.get("/", async (req, res) => {
  try {
    const result = await db.raw(
      "SELECT id, name, email FROM user ORDER BY id DESC"
    );
    res.json(result); // send rows directly
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// Get single user by ID
router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.raw(
      "SELECT id, name, email FROM user WHERE id = ?",
      [id]
    );
    const user = result[0];
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});


// Add a new user
router.post("/add", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "Name and email are required" });

  try {
    await db.raw("INSERT INTO user (name, email) VALUES (?, ?)", [name, email]);
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add user" });
  }
});


// Update existing user
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "Name and email are required" });

  try {
    await db.raw("UPDATE user SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      id,
    ]);
    const updatedUser = await db.raw(
      "SELECT id, name, email FROM user WHERE id = ?",
      [id]
    );
    res.json({ message: "User updated successfully", user: updatedUser[0][0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});


// Delete a user
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.raw("DELETE FROM user WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});


// Get total number of users
router.get("/count", async (req, res) => {
  try {
    const result = await db.raw("SELECT COUNT(*) AS count FROM user");
    const count = result[0].count;
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user count" });
  }
});

export default router;
