const notes = [];

// save note
function saveNote(content, id) {
  // checks
  if (getNote(id)) {
    console.log(`Error: A note with id ${id} already exists!`);
    return;
  }
  if (typeof content !== "string" || content.trim() === "") {
    console.log("Error: Content must be a non-empty string");
    return;
  }
  if (typeof id !== "number" || id <= 0) {
    console.log("Error: ID must be a positive number");
    return;
  }

  // pushing
  notes.push({ content: content.trim(), id });
  console.log(`Note with id ${id} saved successfully!`);
}

// get note by id
function getNote(id) {
  // checks
  if (typeof id !== "number" || isNaN(id)) {
    console.log("Error: Please provide a valid number as ID");
    return null;
  }
  // match
  for (let note of notes) {
    if (note.id === id) {
      return note;
    }
  }

  console.log(`No note found with id: ${id}`);
  return null;
}

// all notes
function logOutNotesFormatted() {
  // check
  if (notes.length === 0) {
    console.log("No notes saved yet!");
    return;
  }

  // printing notes
  console.log("Your Notes:");
  notes.forEach((note) => {
    console.log(
      `The note with id: ${note.id}, has the following note text: "${note.content}"`
    );
  });
}

// testing
saveNote("pick up groceries", 1);
saveNote("do laundry", 2);
saveNote("learn JavaScript", 3);

// notes
console.log(notes);

// note by id
const note = getNote(2);
console.log(note);

// if not exist
getNote(99);

// passing wrong parameter
getNote("hello");

logOutNotesFormatted();
