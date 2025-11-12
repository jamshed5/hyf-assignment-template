const getEventWeekday = (daysFromToday) => {
  // weekday 
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // get today's weekday as a number (0–6)
  const today = new Date();
  const todayIndex = today.getDay();

  // calculate event weekday index
  const eventDayIndex = (todayIndex + daysFromToday) % 7;

  // return weekday name
  return weekdays[eventDayIndex];
};

// printing
console.log(
  "Today is:",
  new Date().toLocaleDateString("en-US", { weekday: "long" })
);
console.log("Event in 9 days will be on:", getEventWeekday(9));
console.log("Event in 2 days will be on:", getEventWeekday(2));
