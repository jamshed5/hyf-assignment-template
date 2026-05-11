import db from "../db/db_connection.js";

async function addPasswordColumn() {
  try {
    console.log("Adding password column...");

    const exists = await db.schema.hasColumn("users", "password");

    if (!exists) {
      await db.schema.alterTable("users", (table) => {
        table.text("password");
      });

      console.log("Password column added");
    } else {
      console.log("Password column already exists");
    }
  } catch (err) {
    console.error("Error adding password column:", err);
  } finally {
    await db.destroy();
    process.exit();
  }
}

addPasswordColumn();