// Import Express framework
import express from "express";

// Import database connection (currently unused in this snippet, but required for models)
import db from "./db/db_connection.js";

// Import routers for users and tasks
import usersRouter from "./routes/userRoutes.js";
import tasksRouter from "./routes/taskRoutes.js";

// Create Express app instance
const app = express();
const port = 3000;

// Middleware: Parse JSON bodies
app.use(express.json());

// Middleware: Serve static files from the "public" folder
app.use(express.static("public"));

// Mount routers
app.use("/users/", usersRouter);   // All user-related routes
app.use("/tasks/", tasksRouter);   // All task-related routes

// Start the server and listen on specified port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
