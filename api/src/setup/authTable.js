import db from "../db/db_connection.js";

async function createAuthTable() {
  try {
    await db.schema.createTable("auth_tokens", (table) => {
      table.increments("id").primary();

      table.integer("user_id").unsigned().notNullable();

      table.text("token").notNullable().unique();

      table.timestamp("created_at").defaultTo(db.fn.now()).notNullable();

      table.timestamp("expires_at").nullable();

      table
        .foreign("user_id")
        .references("users.id")
        .onDelete("CASCADE");
    });

    console.log("auth_tokens table created successfully");
  } catch (err) {
    console.error("Error creating auth_tokens table:", err);
  } finally {
    await db.destroy();
    process.exit();
  }
}

createAuthTable();