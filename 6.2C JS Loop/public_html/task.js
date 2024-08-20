function buildCapPlan() {
    let tbody = document.getElementById("cap-planner-table-body");
    
    // If tbody does not exist, create it and append it to the table
    // it create the <tbody> element only if it doesn't already exist
    if (!tbody) {
        tbody = document.createElement('tbody');
        tbody.id = "cap-planner-table-body";
        document.querySelector('table').appendChild(tbody);
    }

    // If tbody is empty, add the "The plan is currently empty!" row

    // If the <tbody> is empty, 
    // the code inserts a single row with one cell that spans all 8 columns (colspan="8"). 
    // This cell contains the message "The plan is currently empty!" in italicized text (<em>).
    
    if (tbody.innerHTML.trim() === '') {
        tbody.innerHTML = `
            <tr>
                <td colspan="8"><em>The plan is currently empty!</em></td>
            </tr>
        `;
    }
}

function resetCapPlan() {
    const list = document.getElementById("cap-planner-table-body");
    list.innerHTML = '';
}


