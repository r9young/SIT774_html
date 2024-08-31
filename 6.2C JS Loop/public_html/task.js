function buildCapPlan() {
    const numWeeks = parseInt(document.getElementById('weekCountInput').value);
    const numCaps = parseInt(document.getElementById('capCountInput').value);

    if (numWeeks < 1 || numWeeks > 52) {
        alert(`Number of WEEKS must be between 1 and 52 (value ${numWeeks}).`);
        return;
    }

    if (numCaps < 1 || numCaps > 10) {
        alert(`Number of CAPS must be between 1 and 9 (value ${numCaps}).`);
        return;
    }

    const hatList = ["Baseball Cap", "Fedora", "Sun Hat", "Cowboy Hat", "Beret", "Trilby", "Top Hat", "Panama Hat", "Bowler Hat"];
    const selectedHatList = hatList.slice(0, numCaps);
 
    const capTable = [];

    for (let week = 0; week < numWeeks; week++) {
        const weekRow = [];
        for (let day = 0; day < 7; day++) {
            const hatIndex = (week * 7 + day) % selectedHatList.length;
            weekRow.push(selectedHatList[hatIndex]);
        }
        capTable.push(weekRow);
    }

    console.log(capTable);
    generateTable(capTable, numCaps); 
    // function composition or simply function calling another function.
}

function generateTable(tableData, numCaps) {
    const tableBody = document.getElementById('cap-planner-table-body');
    tableBody.innerHTML = "";  // Clear previous content
    let capCounter = 0;  // This will track the total caps to determine when to switch colors

    for (let week = 0; week < tableData.length; week++) {
        const row = document.createElement('tr');

        const weekCell = document.createElement('td');
        weekCell.textContent = `Week ${week + 1}`;
        row.appendChild(weekCell);

        for (let day = 0; day < tableData[week].length; day++) {
            const cell = document.createElement('td');

            // Apply background color based on the capCounter divided by numCaps
            if (Math.floor(capCounter / numCaps) % 2 === 0) {
                cell.style.backgroundColor = '#F8F5F5';  // Light gray color
            } else {
                cell.style.backgroundColor = '#ffffff';  // White color
            }


            // Add data into table
            cell.textContent = tableData[week][day];
            row.appendChild(cell);
            capCounter++;  // Increment the capCounter after each cap is added
        }

        tableBody.appendChild(row);
    }
}

function resetCapPlan() {
    document.getElementById('weekCountInput').value = '';
    document.getElementById('capCountInput').value = '';

    const tableBody = document.getElementById('cap-planner-table-body');
    tableBody.innerHTML = '<tr><td colspan="8"><em>The plan is currently empty!</em></td></tr>';
}
