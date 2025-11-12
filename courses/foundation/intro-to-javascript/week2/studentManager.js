const class07Students = [];

const addStudentToClass = (studentName) => {
  if (!studentName) {
    console.log("You cannot add an empty name to the class");
    return;
  }

  // check already existance
  if (class07Students.includes(studentName)) {
    console.log(`Student ${studentName} is already in the class`);
    return;
  }

  // special rule: Queen
  if (studentName === "Queen") {
    class07Students.push(studentName);
    console.log("The Queen has been added to the class!");
    return;
  }

  // class is full (6 students max)
  if (class07Students.length >= 6) {
    console.log("Cannot add more students to class 07");
    return;
  }

  // otherwise, add the student
  class07Students.push(studentName);
  console.log(`Added ${studentName} to the class`);
};

// getnumber of students
const getNumberOfStudents = () => {
  return class07Students.length;
};

// testing & printing
addStudentToClass("");
addStudentToClass("Benjamin");
addStudentToClass("Sarah");
addStudentToClass("Peter");
addStudentToClass("Lisa");
addStudentToClass("Maria");
addStudentToClass("John");
addStudentToClass("Benjamin"); // already in class
addStudentToClass("Tom"); // class full
addStudentToClass("Queen"); // Queen always allowed

console.log("Number of students:", getNumberOfStudents());
console.log("Current class list:", class07Students);



// Here you have 2 cases: you are trying to add the same person in a full class but shows only one message. Why?

// Added Benjamin to the class ---> Benjamin is not in the array
// Student Benjamin is already in the class --> Benjamin is already in the array
// // check already existance
// if (class07Students.includes(studentName)) {
// console.log(Student ${studentName} is already in the class);
// return;
// }

// here is the output
// You cannot add an empty name to the class
// Added Benjamin to the class
// Added Sarah to the class
// Added Peter to the class
// Added Lisa to the class
// Added Maria to the class
// Added John to the class
// Student Benjamin is already in the class
// Cannot add more students to class 07
// The Queen has been added to the class!
// Number of students: 7
// Current class list: [
// 'Benjamin', 'Sarah',
// 'Peter', 'Lisa',
// 'Maria', 'John',
// 'Queen'
// ]
