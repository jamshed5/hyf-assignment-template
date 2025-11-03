// step 1
const dogYearOfBirth = 2017;
const dogYearFuture = 2027;
const shouldShowResultInDogYears = true;

// step 2
const dogYear = dogYearFuture - dogYearOfBirth;

// step 3
let displayAge;
if (shouldShowResultInDogYears) {
  displayAge = dogYear * 7;
} else {
  displayAge = dogYear;
}

// step 4
const ageType = shouldShowResultInDogYears ? "dog" : "human";
console.log(
  "Your dog will be " +
    displayAge +
    " " +
    ageType +
    " years old in " +
    dogYearFuture
);
