let btn = document.querySelector('#loadExcel');
btn.addEventListener('click', () => {
    fetch('./data.xlsx')
        .then(response => response.blob())
        .then(blob => readXlsxFile(blob))
        .then((rows) => {
            console.log(rows);
            rows.map((row, index) => {
                let table = document.getElementById('tableData');
                if (index == 0) {
                    // Add an extra header for the new column
                    row.push('Sum (Index 1 to 5)');
                    generateTableHead(table, row);
                } else {
                    // Calculate the sum of values from index 1 to index 5
                    let sum = row.slice(1, 6).reduce((acc, val) => acc + Number(val), 0);
                    // Add the sum as the last element of the row
                    row.push(sum);
                    generateTableRows(table, row);
                }
            });
        });

    function generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for(let key of data) {
            let th = document.createElement('th');
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    function generateTableRows(table, data) {
        let newRow = table.insertRow(-1);
        data.map((row, index) => {
            let newCell = newRow.insertCell();
            let newText = document.createTextNode(row);
            newCell.appendChild(newText);
        });
    }
});
