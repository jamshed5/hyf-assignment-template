// Import database connection
import db from "../db/db_connection.js";

// Model: Fetch all users, ordered by ID descending
export const getAllUsers = async () => {
  const rows = await db.raw(
    "SELECT id, name, email FROM user ORDER BY id DESC"
  );
  return rows;
};

// Model: Fetch a single user by ID
export const getUserById = async (id) => {
  const row = await db.raw(
    "SELECT id, name, email FROM user WHERE id = ?",
    [id]
  );
  // Return the first (and only) result
  return row[0];
};

// Model: Create a new user
export const createUser = async (name, email) => {
  await db.raw(
    "INSERT INTO user (name, email) VALUES (?, ?)",
    [name, email]
  );
};

// Model: Update an existing user by ID
export const updateUser = async (id, name, email) => {
  await db.raw(
    "UPDATE user SET name = ?, email = ? WHERE id = ?",
    [name, email, id]
  );

  // Return the updated user
  return getUserById(id);
};

// Model: Delete a user by ID
export const deleteUser = async (id) => {
  await db.raw("DELETE FROM user WHERE id = ?", [id]);
};

// Model: Get total number of users
export const getUserCount = async () => {
  const row = await db.raw("SELECT COUNT(*) AS count FROM user");
  return row[0].count;
};
