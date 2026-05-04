import db from "../db/db_connection.js";

async function seedData() {
  // clear old data first
  await db("snippet_tags").del();
  await db("tags").del();
  await db("snippets").del();
  await db("users").del();

  // USERS
  await db("users").insert([
    {
      first_name: "Aiko",
      last_name: "Tanaka",
      email: "aiko.tanaka@example.com",
      token: "tok123",
      confirmed_at: "2025-01-12 10:30:00",
    },
    {
      first_name: "Mateo",
      last_name: "García",
      email: "mateo.garcia@example.com",
      token: "mad456",
      confirmed_at: "2025-02-18 14:22:00",
    },
    {
      first_name: "Liam",
      last_name: "O'Connor",
      email: "liam.oconnor@example.com",
      token: "dub789",
      confirmed_at: "2025-03-09 09:45:00",
    },
    {
      first_name: "Fatima",
      last_name: "Al-Sayed",
      email: "fatima.alsayed@example.com",
      token: "cai321",
      confirmed_at: "2025-04-01 16:15:00",
    },
    {
      first_name: "Zanele",
      last_name: "Khumalo",
      email: "zanele.khumalo@example.com",
      token: "jhb654",
      confirmed_at: null,
    },
  ]);

  // SNIPPETS
  await db("snippets").insert([
    {
      user_id: 1,
      title: "Async in Python",
      contents: "A quick guide to using asyncio for concurrent tasks.",
      is_private: 0,
    },
    {
      user_id: 1,
      title: "SQL Basics",
      contents: "An introduction to SELECT, WHERE, and JOIN in SQL.",
      is_private: 1,
    },
    {
      user_id: 2,
      title: "React Hooks",
      contents: "Explaining useState and useEffect with examples.",
      is_private: 0,
    },
    {
      user_id: 2,
      title: "Docker 101",
      contents: "Setting up containers for web apps.",
      is_private: 1,
    },
    {
      user_id: 2,
      title: "Node.js Tips",
      contents: "Best practices for writing clean async code.",
      is_private: 0,
    },
    {
      user_id: 3,
      title: "Rust Ownership",
      contents: "A simple explanation of the ownership model.",
      is_private: 0,
    },
    {
      user_id: 3,
      title: "Linux Commands",
      contents: "Common shell commands for beginners.",
      is_private: 1,
    },
    {
      user_id: 4,
      title: "CSS Grid Layout",
      contents: "How to build responsive layouts with CSS Grid.",
      is_private: 0,
    },
    {
      user_id: 4,
      title: "Tailwind Shortcuts",
      contents: "Useful utility classes for quick design.",
      is_private: 1,
    },
    {
      user_id: 4,
      title: "Flask REST API",
      contents: "Creating a small REST API in Flask.",
      is_private: 0,
    },
  ]);

  // TAGS
  await db("tags").insert([
    { name: "javascript" },
    { name: "node" },
    { name: "sql" },
    { name: "react" },
    { name: "docker" },
    { name: "python" },
    { name: "css" },
    { name: "linux" },
    { name: "rust" },
    { name: "flask" },
  ]);

  // SNIPPET_TAGS (many-to-many relations)
  await db("snippet_tags").insert([
    // Async in Python
    { snippet_id: 1, tag_id: 6 }, // python

    // SQL Basics
    { snippet_id: 2, tag_id: 3 }, // sql

    // React Hooks
    { snippet_id: 3, tag_id: 4 }, // react

    // Docker 101
    { snippet_id: 4, tag_id: 5 }, // docker

    // Node.js Tips
    { snippet_id: 5, tag_id: 1 }, // javascript
    { snippet_id: 5, tag_id: 2 }, // node

    // Rust Ownership
    { snippet_id: 6, tag_id: 9 }, // rust

    // Linux Commands
    { snippet_id: 7, tag_id: 8 }, // linux

    // CSS Grid Layout
    { snippet_id: 8, tag_id: 7 }, // css

    // Tailwind Shortcuts (reuse css)
    { snippet_id: 9, tag_id: 7 }, // css

    // Flask REST API
    { snippet_id: 10, tag_id: 10 }, // flask
    { snippet_id: 10, tag_id: 6 }, // python
  ]);

  console.log("Sample data inserted successfully");
  process.exit();
}

seedData();