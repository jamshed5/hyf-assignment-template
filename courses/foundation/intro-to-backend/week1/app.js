import express, { response } from "express";
import db from "./db/db_connection.js";
import usersRouter from "./routes/users.js";
import tasksRouter from "./routes/tasks.js";


const app = express();
const port = 3000;

// middleware
app.use(express.json());

// serve static HTML
app.use(express.static("public"));

// routes
app.use("/users/", usersRouter);   // all user-related routes
app.use("/tasks/", tasksRouter);   // all task-related routes


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

