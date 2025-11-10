// function
const getFullName = (firstName, surname, useFormalName, gender) => {
  if (!firstName && !surname) {
    return "Name is missing ...";
  }

  let fullName = firstName + " " + surname;

  if (useFormalName) {
    if (gender === "female") {
      fullName = "Lady " + fullName;
    } else if (gender === "male") {
      fullName = "Lord " + fullName;
    } else {
      fullName = "Mx " + fullName; // gender-neutral option
    }
  }

  return fullName.trim();
};

// printing
console.log(getFullName("Benjamin", "Hughes", true, "male"));
console.log(getFullName("Maria", "alex", true, "female"));
console.log(getFullName("Hiroshi", "Tanaka", true));
console.log(getFullName("Sam", "Green", false));
