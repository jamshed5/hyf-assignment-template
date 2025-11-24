// global variables
let userName = "";
let todos = [];
let timerId = null;

function getReply(command) {
  command = command.trim();

  // name handling
  if (command.startsWith("Hello my name is")) {
    const name = command.replace("Hello my name is", "").trim();

    if (userName.toLowerCase() === name.toLowerCase()) {
      return `I already know your name is ${userName}.`;
    }

    userName = name;
    return `Nice to meet you ${userName}`;
  }

  if (command === "What is my name?" || command === "What is my name") {
    if (!userName) return "I don't know your name yet.";
    return `Your name is ${userName}`;
  }

  // todo handling
  if (command.startsWith("Add ") && command.endsWith(" to my todo")) {
    const item = command.replace("Add ", "").replace(" to my todo", "");
    todos.push(item);
    return `${item} added to your todo`;
  }

  if (command.startsWith("Remove ") && command.endsWith(" from my todo")) {
    const item = command.replace("Remove ", "").replace(" from my todo", "");
    const index = todos.indexOf(item);
    if (index !== -1) {
      todos.splice(index, 1);
      return `Removed ${item} from your todo`;
    }
    return `${item} was not found on your todo list`;
  }

  if (command === "What is on my todo?" || command === "What is on my todo") {
    if (todos.length === 0) return "Your todo list is empty.";
    if (todos.length === 1) return `You have 1 todo: ${todos[0]}`;
    return `You have ${todos.length} todos - ${todos.join(" and ")}`;
  }

  // date handling
  if (command === "What day is it today?") {
    const today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const monthNames = [
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
    return `${day}. of ${monthNames[today.getMonth()]} ${year}`;
  }

  // math handling
  if (command.startsWith("What is")) {
    const math = command.replace("What is", "").trim().replace("?", "");

    try {
      const result = eval(math);
      if (!isNaN(result)) return result.toString();
    } catch {
      return "I cannot calculate that.";
    }
  }

  // timer
  if (command.startsWith("Set a timer for")) {
    const minutesStr = command
      .replace("Set a timer for", "")
      .replace("minutes", "")
      .trim();
    const minutes = Number(minutesStr);

    if (isNaN(minutes)) return "That's not a valid time.";

    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      console.log("Timer done");
    }, minutes * 60 * 1000);

    return `Timer set for ${minutes} minutes`;
  }

  // extra
  if (command === "How many todos do I have?") {
    return `You have ${todos.length} todos.`;
  }

  // unknow cmd
  return "I don't understand that command.";
}

// testing
console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("What is 4 * 12?"));
console.log(getReply("Set a timer for 1 minutes"));
