import express, { response } from "express";
import db from "./db/db_connection.js";

const app = express();
const port = 3000;

// middleware
app.use(express.json());

// default (index) total users (HTML plus JS)
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>User Count</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #667eea;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }
    .card {
      background: white;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      text-align: center;
      width: 320px;
    }
    h1 {
      margin-bottom: 10px;
      color: #333;
    }
    .count {
      font-size: 48px;
      font-weight: bold;
      color: #667eea;
      margin: 20px 0;
    }
    .footer {
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Total Users</h1>
    <div class="count" id="count">...</div>
  </div>

  <script>
    async function loadCount() {
      const response = await fetch("/user-count");
      const data = await response.json();
      console.log(data[0])
      document.getElementById("count").textContent = data[0].count;
    }

    loadCount();
  </script>
</body>
</html>
  `);
});

// user count
app.get("/user-count", async (req, res) => {
  try {
    const users = await db.raw(`SELECT COUNT(*) AS count FROM user`);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// all tasks
app.get("/all-tasks", async (req, res) => {
  try {
    const result = await db.raw("SELECT * FROM task");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// recently created task
app.get("/recently-created-task", async (req, res) => {
  try {
    const result = await db.raw(
      "select * from task order by created desc limit 1"
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// all done tasks
app.get("/done-tasks", async (req, res) => {
  try {
    const result = await db.raw(`
        select title, description, status_id ,user_id,status.name  from task 
        join user on task.user_id=user.id
        join status on task.status_id=status.id where task.status_id = 3
        `);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
