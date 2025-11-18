const seriesDurations = [
  {
    title: "Game of Thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "The Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
  // my favorite shows
  {
    title: "Breaking Bad",
    days: 2,
    hours: 3,
    minutes: 0,
  },
  {
    title: "Stranger Things",
    days: 1,
    hours: 8,
    minutes: 30,
  },
];

function logOutSeriesText() {
  const averageLifespanYears = 80;
  // total minutes in 80 years
  const lifespanInMinutes = averageLifespanYears * 365 * 24 * 60;

  let totalPercentage = 0;
  seriesDurations.forEach((series) => {
    // convert series duration to minutes
    const seriesInMinutes =
      series.days * 24 * 60 + series.hours * 60 + series.minutes;

    // calculate percentage of life
    const percentageOfLife = (seriesInMinutes / lifespanInMinutes) * 100;

    // formatting
    const formattedPercentage = percentageOfLife.toFixed(3);

    console.log(`${series.title} took ${formattedPercentage}% of my life`);

    totalPercentage += percentageOfLife;
  });

  // total with 2 decimal
  console.log(`\nIn total that is ${totalPercentage.toFixed(2)}% of my life`);
}

logOutSeriesText();
