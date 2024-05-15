document.addEventListener("DOMContentLoaded", function () {
  // Fetch CSV file
  fetch("data.csv")
    .then((response) => response.text())
    .then((csvData) => {
      // Parse CSV data
      const rows = csvData.split("\n");
      const tableBody = document.querySelector("#dataTable tbody");

      // Populate table with CSV data
      rows.forEach((row) => {
        const [item, rate] = row.split(",");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${item}</td><td>${rate}</td>`;
        tableBody.appendChild(newRow);
      });
    })
    .catch((error) => console.log("Error fetching CSV file:", error));

  // Function to update table when an element is deleted
  function updateTable() {
    // Fetch updated CSV file
    fetch("data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const existingRows = document.querySelectorAll("#dataTable tbody tr");
        const updatedRows = csvData.split("\n");

        // Remove rows that are not present in the updated CSV data
        existingRows.forEach((existingRow) => {
          const existingItem = existingRow.cells[0].textContent;
          if (!updatedRows.some((row) => row.startsWith(existingItem))) {
            existingRow.remove();
          }
        });

        // Add rows for new items in the updated CSV data
        updatedRows.forEach((updatedRow) => {
          const [item, rate] = updatedRow.split(",");
          const existingItem = [...existingRows].find(
            (row) => row.cells[0].textContent === item
          );
          if (!existingItem) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `<td>${item}</td><td>${rate}</td>`;
            tableBody.appendChild(newRow);
          }
        });
      })
      .catch((error) => console.log("Error fetching updated CSV file:", error));
  }

  // Call updateTable function periodically to check for updates
  setInterval(updateTable, 5000); // Check for updates every 5 seconds (adjust as needed)
});
