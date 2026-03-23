export const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

function searchTeas(query) {
  // fetch teas
  return fetch(`${API_BASE}/teas`)
    .then((response) => response.json())
    .then((teas) => {
      // convert lower case
      const lowerQuery = query.toLowerCase();

      const results = teas.filter((tea) =>
        // check include
        tea.name.toLowerCase().includes(lowerQuery),
      );

      // return array of objects (match)
      return results;
    });
}

// searchTeas("pearl")  -  return promise
searchTeas("pearl").then((teas) => {
  console.log("Search results for 'pearl':");
  teas.forEach((tea) => console.log(`- ${tea.name}`));
});
