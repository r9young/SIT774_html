document.getElementById('hat-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way
    
    const numWeeks = parseInt(document.getElementById('num-weeks').value);
    const numHats = parseInt(document.getElementById('num-hats').value);

    // List of available hats
    const hatList = ["Baseball Cap", 
                    "Fedora Cap", 
                    "Sun Cap", 
                    "Porkpie Cap", 
                    "Beret Cap", 
                    "Sun Visor", 
                    "Bucket Cap", 
                    "Panama Cap", 
                    "Flat Cap"];
    
    // Initialize the hat table as a 2D array
    const hatTable = [];

    // Fill the table with hats from the hatList
    for (let week = 0; week < numWeeks; week++) {
        const weekRow = [];
        for (let day = 0; day < numHats; day++) {
            // Cycle through the hat list
            const hatIndex = (week * numHats + day) % hatList.length;
            weekRow.push(hatList[hatIndex]);
        }
        hatTable.push(weekRow);
    }

    // Function to generate the HTML table
    function generateTable(tableData) {
        // tableData is a parameter.
        const table = document.createElement('table');
        // Add headers for days of the week
        const headerRow = document.createElement('tr');
        for (let i = 0; i < tableData[0].length; i++) {
            const headerCell = document.createElement('th');
            // headerCell.textContent = `Day ${i + 1}`;
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        // Add data rows for each week
        for (let week = 0; week < tableData.length; week++) {
        // This loop iterates over the days within the current week.
            const row = document.createElement('tr');
            for (let day = 0; day < tableData[week].length; day++) {
                const cell = document.createElement('td');
                cell.textContent = tableData[week][day];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        return table;
    }

    // Clear the previous table if it exists
    const scheduleDiv = document.getElementById('hat-schedule');
    scheduleDiv.innerHTML = "";

    // Append the generated table to the div with id "hat-schedule"
    scheduleDiv.appendChild(generateTable(hatTable));
});
