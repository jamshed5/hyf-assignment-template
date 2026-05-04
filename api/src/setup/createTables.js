import db from "../db/db_connection.js";

async function createTables() {
  // USERS TABLE
  await db.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.timestamp("created_at").defaultTo(db.fn.now()).notNullable();
    table.timestamp("confirmed_at").nullable();
    table.text("first_name").notNullable();
    table.text("last_name").notNullable();
    table.text("email").notNullable().unique();
    table.text("token").unique();
  });

  // SNIPPETS TABLE
  await db.schema.createTable("snippets", (table) => {
    table.increments("id").primary();
    table.timestamp("created_at").defaultTo(db.fn.now()).notNullable();
    table.integer("user_id").notNullable();
    table.text("title").notNullable();
    table.text("contents").notNullable();
    table.integer("is_private").notNullable().defaultTo(true);

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
  });

  // TAGS TABLE 
  await db.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable().unique();
  });

  // SNIPPET_TAGS (MANY-TO-MANY) 
await db.schema.createTable("snippet_tags", (table) => {
  table.integer("snippet_id").notNullable();
  table.integer("tag_id").notNullable();

  table.primary(["snippet_id", "tag_id"]); // prevents duplicates

  table
    .foreign("snippet_id")
    .references("id")
    .inTable("snippets")
    .onDelete("CASCADE");

  table
    .foreign("tag_id")
    .references("id")
    .inTable("tags")
    .onDelete("CASCADE");
});
  console.log("Tables created successfully");
  process.exit();
}

createTables();