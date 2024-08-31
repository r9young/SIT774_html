let btn = document.querySelector('#loadExcel');
btn.addEventListener('click', () => {
    // FETCH EXCEL FILE FROM A URL OR LOCAL URL
    fetch('./employees_data.xlsx')
        .then(response => response.blob())
        .then(blob => readXlsxFile(blob))
        .then((rows) => {
            console.log(rows);
            // LOOP THROUGH ROWS
            rows.map((row, index) => {
                let table = document.getElementById('tableData');
                (index == 0)
                ? generateTableHead(table, row)
                : generateTableRows(table, row);

                index++;
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