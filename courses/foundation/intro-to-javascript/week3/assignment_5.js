let activities = [];

// optional daily limit (in minutes)
let limit = null;

// add activity (date is optional)
function addActivity(activity, duration, date) {
  // not given so use today
  if (!date) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    date = `${day}/${month}-${year}`;
  }

  activities.push({
    date: date,
    activity: activity,
    duration: duration,
  });
}

// show status for today (or a specific date)
function showStatus(date) {
  // if not given then use today
  if (!date) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    date = `${day}/${month}-${year}`;
  }

  // find activities for that date
  let dayActivities = activities.filter((a) => a.date === date);

  if (dayActivities.length === 0) {
    return "Add some activities before calling showStatus";
  }

  let total = 0;
  for (let act of dayActivities) {
    total += act.duration;
  }

  let message = `You have added ${dayActivities.length} activities today. They amount to ${total} min. of usage`;

  if (limit !== null && total > limit) {
    message += " You have reached your limit, no more smartphoning for you!";
  }

  return message;
}

// set a daily limit
function setLimit(minutes) {
  limit = minutes;
}

// extra feature: find the most used activity today
function mostUsedToday() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const todayStr = `${day}/${month}-${year}`;

  let dayActivities = activities.filter((a) => a.date === todayStr);

  if (dayActivities.length === 0) {
    return "No activities today yet.";
  }

  let mostTime = 0;
  let mostActivity = "";

  for (let act of dayActivities) {
    if (act.duration > mostTime) {
      mostTime = act.duration;
      mostActivity = act.activity;
    }
  }

  return `Most used: ${mostActivity} (${mostTime} minutes)`;
}

// testing
addActivity("Youtube", 45);
addActivity("Instagram", 20);
addActivity("Twitter", 15);

console.log(showStatus());
setLimit(60);
console.log(showStatus());
console.log(mostUsedToday());
