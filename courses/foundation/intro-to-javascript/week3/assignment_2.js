// function
function calculateTravelTime(travelInfo) {
  const speed = travelInfo.speed;
  const distance = travelInfo.destinationDistance;

  const timeInHours = distance / speed;
  const hours = Math.floor(timeInHours);
  const minutes = Math.round((timeInHours - hours) * 60);

  // formating
  if (hours === 0) {
    return `${minutes} minutes`;
  } else if (minutes === 0) {
    return `${hours} hours`;
  } else {
    return `${hours} hours and ${minutes} minutes`;
  }
}

// object
const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

// passing object
const travelTime = calculateTravelTime(travelInformation);
console.log(travelTime);
