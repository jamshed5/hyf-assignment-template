import db from "../db/db_connection.js";

// models
export const getAllUsers = async () => {
  const rows = await db.raw(
    "SELECT id, name, email FROM user ORDER BY id DESC"
  );
  return rows;
};

export const getUserById = async (id) => {
  const row = await db.raw("SELECT id, name, email FROM user WHERE id = ?", [
    id,
  ]);
  return row[0];
};

export const createUser = async (name, email) => {
  await db.raw("INSERT INTO user (name, email) VALUES (?, ?)", [name, email]);
};

export const updateUser = async (id, name, email) => {
  await db.raw("UPDATE user SET name = ?, email = ? WHERE id = ?", [
    name,
    email,
    id,
  ]);

  return getUserById(id);
};

export const deleteUser = async (id) => {
  await db.raw("DELETE FROM user WHERE id = ?", [id]);
};

export const getUserCount = async () => {
  const row = await db.raw("SELECT COUNT(*) AS count FROM user");
  return row[0].count;
};
