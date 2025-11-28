const todos = [];  // declear const
let userName = "";
let timerId = null;

// handle name
function handleName(cmd, original) {
  if (cmd.startsWith("hello my name is")) {
    const name = original.slice("Hello my name is".length).trim();

    if (userName.toLowerCase() === name.toLowerCase()) {
      return `I already know your name is ${userName}.`;
    }

    userName = name;
    return `Nice to meet you ${userName}`;
  }

  if (cmd === "what is my name?" || cmd === "what is my name") {
    if (!userName) return "I don't know your name yet.";
    return `Your name is ${userName}`;
  }

  return null;
}

// handle todo
function handleTodo(cmd, original) {
  if (cmd.startsWith("add ") && cmd.endsWith(" to my todo")) {
    const item = original.slice(4, original.length - " to my todo".length);
    todos.push(item);
    return `${item} added to your todo`;
  }

  if (cmd.startsWith("remove ") && cmd.endsWith(" from my todo")) {
    const item = original.slice(7, original.length - " from my todo".length);
    const index = todos.indexOf(item);

    if (index !== -1) {
      todos.splice(index, 1);
      return `Removed ${item} from your todo`;
    }
    return `${item} was not found on your todo list`;
  }

  if (cmd === "what is on my todo?" || cmd === "what is on my todo") {
    if (todos.length === 0) return "Your todo list is empty.";
    if (todos.length === 1) return `You have 1 todo: ${todos[0]}`;
    return `You have ${todos.length} todos - ${todos.join(" and ")}`;
  }

  return null;
}

// handle date
function handleDate(cmd) {
  if (cmd === "what day is it today?") {
    const today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day}. of ${months[today.getMonth()]} ${year}`;
  }

  return null;
}

// handle math
function handleMath(cmd, original) {
  if (!cmd.startsWith("what is")) return null;

  const expression = original
    .slice("What is".length)
    .trim()
    .replace("?", "")
    .trim();

  const operators = ["+", "-", "*", "/"];

  for (const op of operators) {
    if (expression.includes(op)) {
      const parts = expression.split(op).map((p) => p.trim());
      if (parts.length !== 2) return "I cannot calculate that.";

      const left = Number(parts[0]);
      const right = Number(parts[1]);

      if (isNaN(left) || isNaN(right)) return "I cannot calculate that.";

      switch (op) {
        case "+":
          return (left + right).toString();
        case "-":
          return (left - right).toString();
        case "*":
          return (left * right).toString();
        case "/":
          return right === 0
            ? "Cannot divide by zero."
            : (left / right).toString();
      }
    }
  }

  return "I cannot calculate that.";
}

// handle timer
function handleTimer(cmd) {
  const SECONDS_PER_MINUTE = 60;
  const MS_PER_SECOND = 1000;

  if (cmd.startsWith("set a timer for")) {
    const minutesStr = cmd
      .replace("set a timer for", "")
      .replace("minutes", "")
      .trim();
    const minutes = Number(minutesStr);

    if (isNaN(minutes)) return "That's not a valid time.";

    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(
      () => console.log("Timer done"),
      minutes * SECONDS_PER_MINUTE * MS_PER_SECOND
    );

    return `Timer set for ${minutes} minutes`;
  }

  return null;
}

function handleExtra(cmd) {
  if (cmd === "how many todos do i have?") {
    return `You have ${todos.length} todos.`;
  }

  return null;
}

// mainfun getReply
function getReply(command) {
  const original = command.trim();
  const cmd = original.toLowerCase();

  return (
    handleName(cmd, original) ||
    handleTodo(cmd, original) ||
    handleDate(cmd) ||
    handleMath(cmd, original) ||
    handleTimer(cmd) ||
    handleExtra(cmd) ||
    "I don't understand that command."
  );
}

// testing
console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log("Todos: ", todos);
console.log(getReply("What is 4 * 12?"));
console.log(getReply("What is 12 - 4?"));
console.log(getReply("Set a timer for 1 minutes"));
