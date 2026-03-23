function runSequentially(tasks, finalCallback) {
  let index = 0;

  function next() {
    if (index >= tasks.length) {
      finalCallback();
      return;
    }

    // Get the current task (task -> function)
    const task = tasks[index];
    index++;

    // Execute the current task and pass `next` as the `done` callback.
    // When the task finishes and calls `done()`, it triggers the next task.
    task(next);
  }

  // start next
  next();
}

const tasks = [
  // process 1
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  // process 2
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  // process 3
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});

// Insights
// These tasks are sequential, meaning they run step by step.
// The problem is: if the first task fails, is there any chance that tasks 2 and 3 will still run? (No)
// If I run these three tasks asynchronously, but they all depend on the same input, then the execution becomes sequential again.
// Asynchronous tasks can run concurrently only if they are independent.
// Using async in JavaScript does not guarantee true parallel execution because JS is single-threaded.
// True parallelism can be achieved using threads(Node ->Worker Threads), but only for independent tasks; dependent tasks still execute sequentially.
