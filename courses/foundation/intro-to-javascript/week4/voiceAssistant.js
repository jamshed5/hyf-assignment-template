// const todos = [];  // declear const
// let userName = "";
// let timerId = null;

// // handle name
// function handleName(cmd, original) {
//   if (cmd.startsWith("hello my name is")) {
//     const name = original.slice("Hello my name is".length).trim();

//     if (userName.toLowerCase() === name.toLowerCase()) {
//       return `I already know your name is ${userName}.`;
//     }

//     userName = name;
//     return `Nice to meet you ${userName}`;
//   }

//   if (cmd === "what is my name?" || cmd === "what is my name") {
//     if (!userName) return "I don't know your name yet.";
//     return `Your name is ${userName}`;
//   }

//   return null;
// }

// // handle todo
// function handleTodo(cmd, original) {
//   if (cmd.startsWith("add ") && cmd.endsWith(" to my todo")) {
//     const item = original.slice(4, original.length - " to my todo".length);
//     todos.push(item);
//     return `${item} added to your todo`;
//   }

//   if (cmd.startsWith("remove ") && cmd.endsWith(" from my todo")) {
//     const item = original.slice(7, original.length - " from my todo".length);
//     const index = todos.indexOf(item);

//     if (index !== -1) {
//       todos.splice(index, 1);
//       return `Removed ${item} from your todo`;
//     }
//     return `${item} was not found on your todo list`;
//   }

//   if (cmd === "what is on my todo?" || cmd === "what is on my todo") {
//     if (todos.length === 0) return "Your todo list is empty.";
//     if (todos.length === 1) return `You have 1 todo: ${todos[0]}`;
//     return `You have ${todos.length} todos - ${todos.join(" and ")}`;
//   }

//   return null;
// }

// // handle date
// function handleDate(cmd) {
//   if (cmd === "what day is it today?") {
//     const today = new Date();
//     const day = today.getDate();
//     const year = today.getFullYear();
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     return `${day}. of ${months[today.getMonth()]} ${year}`;
//   }

//   return null;
// }

// // handle math
// function handleMath(cmd, original) {
//   if (!cmd.startsWith("what is")) return null;

//   const expression = original
//     .slice("What is".length)
//     .trim()
//     .replace("?", "")
//     .trim();

//   const operators = ["+", "-", "*", "/"];

//   for (const op of operators) {
//     if (expression.includes(op)) {
//       const parts = expression.split(op).map((p) => p.trim());
//       if (parts.length !== 2) return "I cannot calculate that.";

//       const left = Number(parts[0]);
//       const right = Number(parts[1]);

//       if (isNaN(left) || isNaN(right)) return "I cannot calculate that.";

//       switch (op) {
//         case "+":
//           return (left + right).toString();
//         case "-":
//           return (left - right).toString();
//         case "*":
//           return (left * right).toString();
//         case "/":
//           return right === 0
//             ? "Cannot divide by zero."
//             : (left / right).toString();
//       }
//     }
//   }

//   return "I cannot calculate that.";
// }

// // handle timer
// function handleTimer(cmd) {
//   const SECONDS_PER_MINUTE = 60;
//   const MS_PER_SECOND = 1000;

//   if (cmd.startsWith("set a timer for")) {
//     const minutesStr = cmd
//       .replace("set a timer for", "")
//       .replace("minutes", "")
//       .trim();
//     const minutes = Number(minutesStr);

//     if (isNaN(minutes)) return "That's not a valid time.";

//     if (timerId) clearTimeout(timerId);

//     timerId = setTimeout(
//       () => console.log("Timer done"),
//       minutes * SECONDS_PER_MINUTE * MS_PER_SECOND
//     );

//     return `Timer set for ${minutes} minutes`;
//   }

//   return null;
// }

// function handleExtra(cmd) {
//   if (cmd === "how many todos do i have?") {
//     return `You have ${todos.length} todos.`;
//   }

//   return null;
// }

// // mainfun getReply
// function getReply(command) {
//   const original = command.trim();
//   const cmd = original.toLowerCase();

//   return (
//     handleName(cmd, original) ||
//     handleTodo(cmd, original) ||
//     handleDate(cmd) ||
//     handleMath(cmd, original) ||
//     handleTimer(cmd) ||
//     handleExtra(cmd) ||
//     "I don't understand that command."
//   );
// }

// // testing
// console.log(getReply("Hello my name is Benjamin"));
// console.log(getReply("What is my name?"));
// console.log(getReply("Add fishing to my todo"));
// console.log(getReply("Remove fishing from my todo"));
// console.log("Todos: ", todos);
// console.log(getReply("What is 4 * 12?"));
// console.log(getReply("What is 12 - 4?"));
// console.log(getReply("Set a timer for 1 minutes"));

//  updated version (according to the comments )
const todos = [];
let userName = "";
let timerId = null;

function setUserName(name) {
  const trimmedName = name.trim();
  if (userName.toLowerCase() === trimmedName.toLowerCase()) {
    return `I already know your name is ${userName}.`;
  }
  userName = trimmedName;
  return `Nice to meet you ${userName}`;
}

function getUserName() {
  return userName ? `Your name is ${userName}` : "I don't know your name yet.";
}

function addTodo(item) {
  todos.push(item);
  return `${item} added to your todo`;
}

function removeTodo(item) {
  const index = todos.indexOf(item);
  if (index === -1) return `${item} was not found on your todo list`;
  todos.splice(index, 1);
  return `Removed ${item} from your todo`;
}

function listTodos() {
  if (todos.length === 0) return "Your todo list is empty.";
  if (todos.length === 1) return `You have 1 todo: ${todos[0]}`;
  return `You have ${todos.length} todos - ${todos.join(" and ")}`;
}

function getTodayDate() {
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

function calculateMath(expression) {
  const operators = ["+", "-", "*", "/"];

  for (const op of operators) {
    if (expression.includes(op)) {
      const [left, right] = expression.split(op).map((v) => v.trim());
      const a = Number(left);
      const b = Number(right);

      if (isNaN(a) || isNaN(b)) return "I cannot calculate that.";

      switch (op) {
        case "+":
          return String(a + b);
        case "-":
          return String(a - b);
        case "*":
          return String(a * b);
        case "/":
          return b === 0 ? "Cannot divide by zero." : String(a / b);
      }
    }
  }

  return "I cannot calculate that.";
}

function setTimer(minutes) {
  if (isNaN(minutes)) return "That's not a valid time.";

  if (timerId) clearTimeout(timerId);

  timerId = setTimeout(() => console.log("Timer done"), minutes * 60000);
  return `Timer set for ${minutes} minutes`;
}

function getReply(command) {
  const trimmed = command.trim();
  const lower = trimmed.toLowerCase();
  const words = lower.split(" ");

  // Name
  if (lower.startsWith("hello my name is")) {
    const name = trimmed.slice(17).trim();
    return setUserName(name);
  }

  if (lower === "what is my name" || lower === "what is my name?") {
    return getUserName();
  }

  // Todo
  if (lower.startsWith("add ") && lower.endsWith(" to my todo")) {
    const item = trimmed.slice(4, trimmed.length - 12).trim();
    return addTodo(item);
  }

  if (lower.startsWith("remove ") && lower.endsWith(" from my todo")) {
    const item = trimmed.slice(7, trimmed.length - 14).trim();
    return removeTodo(item);
  }

  if (lower === "what is on my todo" || lower === "what is on my todo?") {
    return listTodos();
  }

  // Date
  if (lower === "what day is it today?") {
    return getTodayDate();
  }

  // Math
  if (lower.startsWith("what is")) {
    const expression = trimmed.slice(7).replace("?", "").trim();
    return calculateMath(expression);
  }

  // Timer
  if (lower.startsWith("set a timer for")) {
    const minutes = Number(words[4]);
    return setTimer(minutes);
  }

  // Extra
  if (lower === "how many todos do i have?") {
    return `You have ${todos.length} todos.`;
  }

  return "I don't understand that command.";
}

console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is 4 * 4"));
console.log(getReply("What is 3 + 3"));
console.log(getReply("Set a timer for 1 minutes"));
console.log(getReply("What time is it?"));
