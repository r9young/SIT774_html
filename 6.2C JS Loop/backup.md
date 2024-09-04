function buildCapPlan() {
    // Get the value of the 'weeks' input field
    let weekCount = document.getElementById('weekCountInput').value;

    // Get the value of the 'caps' input field
    let capCount = document.getElementById('capCountInput').value;

    // Check if the values are empty or undefined
    if (!weekCount || !capCount) {
        console.error('Please enter valid values for both weeks and caps.');
        return;
    }

    // Now, use the values directly to build the cap plan
    console.log(`Building cap plan with ${weekCount} weeks and ${capCount} caps.`);
    
    // Add your logic here to build the cap plan using weekCount and capCount
    // Example: Create a table or list to represent the cap plan

    creatTable(weekCount, capCount)

}

function creatTable(weekCount, capCount) {
    const caps = ['Cap1', 'Cap2', 'Cap3', 'Cap4', 'Cap5', 'Cap6', 'Cap7'];
    const numWeeks = weekCount;
    const daysPerWeek = capCount;
    
    let tbody = document.getElementById("cap-planner-table-body");

    // Clear the previous content
    tbody.innerHTML = '';

    // Create rows for each week
    for (let week = 0; week < numWeeks; week++) {
        const tr = document.createElement('tr');
        const weekCell = document.createElement('td');
        weekCell.textContent = `Week ${week + 1}`;
        tr.appendChild(weekCell);

        // Fill days with caps
        for (let day = 0; day < daysPerWeek; day++) {
            const td = document.createElement('td');
            
            // Distribute caps for the first two weeks normally
            // if (week < 2) {
            //     td.textContent = caps[day % caps.length];
            // } else {
            //     // Handle the remainder in the third week
            //     const remainder = daysPerWeek % caps.length;
            //     if (day < remainder) {
            //         td.textContent = caps[day];
            //     } else {
            //         td.textContent = caps[day % caps.length];
            //     }
            // }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}
