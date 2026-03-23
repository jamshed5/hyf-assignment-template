export async function fetchTea(teaId) {
  console.log("Fetching tea:", teaId);
  const response = await fetch(`https://tea-api-787553294298.europe-west1.run.app/api/teas/${teaId}`);
  const tea = await response.json();
  console.log("Fetched tea:", tea);
  return tea;
}

// example code that runs immediately
console.log("Module loaded");
fetchTea(1); 