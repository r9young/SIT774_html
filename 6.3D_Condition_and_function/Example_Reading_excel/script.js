let btn = document.querySelector('#loadExcel');
btn.addEventListener('click', () => {
    // Directly use the JSON data defined in the script
    const capRatingListJSON = {
        capratings: [
            { cap:"BBC", stars: [12,34,532,321,77] },
            { cap:"FDC", stars: [55,23,123,59,24] },
            { cap:"SNC", stars: [33,124,288,983,672] },
            { cap:"PPC", stars: [61,234,341,633,43] },
            { cap:"BRC", stars: [88,341,343,456,234] },
            { cap:"SNV", stars: [12,44,123,233,88] },
            { cap:"BKC", stars: [56,77,44,23,17] },
            { cap:"PNC", stars: [78,389,545,241,112] },
            { cap:"FLC", stars: [37,201,358,332,123] },
            { cap:"CBC", stars: [19,42,112,215,99] }
        ]
    };

    // Use the capRatingListJSON object to generate the table
    capRatingListJSON.capratings.map((capData, index) => {
        let table = document.getElementById('tableData');
        
        if (index == 0) {
            // Add the table headers
            generateTableHead(table, ['Cap Name', 'Full Name', '1 Star', '2 Star', '3 Star', '4 Star', '5 Star', 'Total Ratings', 'Average Rating', 'Rating Category']);
        }

        // Process the data for each cap
        let fullName = fullCapName(capData.cap);
        let totalRatings = calcCapRatingTotal(capData.stars);
        let averageRating = calcCapAverageRating(capData.stars);
        let ratingCategory = capCategory(averageRating);

        // Create the row with all required information
        let rowData = [capData.cap, fullName, ...capData.stars, totalRatings, averageRating.toFixed(2), ratingCategory];
        // console.log(rowData);
        // Add the row and get the newly created row
        let newRow = generateTableRows(table, rowData);

        // Change the color of the "Rating Category" cell only
        setColor(newRow, 'Rating Category');
        setColor(newRow, '1 Star');
        setColor(newRow, '2 Star');
        setColor(newRow, '3 Star');
        setColor(newRow, '4 Star');
        setColor(newRow, '5 Star');

    });

    //add a table header function
    function generateTableHead(table, headers) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        headers.forEach(header => {
            let th = document.createElement('th');
            let text = document.createTextNode(header);
            th.appendChild(text);
            row.appendChild(th);
        });
    }

    function generateTableRows(table, data) {
        let newRow = table.insertRow(-1); // Insert the new row at the end of the table
        data.forEach(cellData => {
            let newCell = newRow.insertCell();
            let newText = document.createTextNode(cellData);
            newCell.appendChild(newText);
        });
        return newRow; // Return the newly created row
    }

    function fullCapName(abbreviatedCapName) {
        switch (abbreviatedCapName) {
            case "BBC": return "Baseball Cap";
            case "FDC": return "Fedora Cap";
            case "SNC": return "Sun Cap";
            case "PPC": return "Porkpie Cap";
            case "BRC": return "Beret Cap";
            case "SNV": return "Sun Visor";
            case "BKC": return "Bucket Cap";
            case "PNC": return "Panama Cap";
            case "FLC": return "Flat Cap";
            case "CBC": return "Cowboy Cap";
        }
    }

    function calcCapRatingTotal(capRatingsArray) {
        return capRatingsArray.reduce((total, rating) => total + rating, 0);
    }

    function calcCapAverageRating(capRatingsArray) {
        const totalRatings = calcCapRatingTotal(capRatingsArray);
        const weightedSum = capRatingsArray.reduce((sum, rating, index) => sum + (rating * (index + 1)), 0);
        return totalRatings ? (weightedSum / totalRatings) : 0;
    }

    function capCategory(capRating) {
        if (capRating < 2.5) {
            return 'Poor';
        } else if (capRating < 4.0) {
            return 'Good';
        } else {
            return 'Great';
        }
    }

    function setColor(row, columnName) {
        // Get the table that contains the row
        let table = row.closest('table');
        
        // Get all table headers
        let headers = table.querySelectorAll('th');
        
        // Find the index of the column with the specified name
        let columnIndex = Array.from(headers).findIndex(header => header.textContent === columnName);
        
        if (columnIndex !== -1) {
            // Set the background color of the header (th)
            let headerCell = headers[columnIndex];
            headerCell.style.backgroundColor = "#d3d3d3"; // Set the background color for the header

            // Set the background color of the corresponding row cell
            let columnName = row.cells[columnIndex]; 
            columnName.style.backgroundColor = "#d3d3d3"; // Set the background color for the cell in the row
        } else {
            console.error(`Column "${columnName}" not found.`);
        }
    }


    // the problem of the following function is that it is not read the average column. it read the raw json data. 

    // highest average built

    // we need the abstract the array

    function highest_average() {
       let highestAvg = 0;
       let capWithHighestAvg = '';


        // console.log(newRow)
        // script.js:36 (10) ['FDC', 'Fedora Cap', 55, 23, 123, 59, 24, 284, '2.91', 'Good']
        // script.js:36 (10) ['SNC', 'Sun Cap', 33, 124, 288, 983, 672, 2100, '4.02', 'Great']
        // script.js:36 (10) ['PPC', 'Porkpie Cap', 61, 234, 341, 633, 43, 1312, '3.28', 'Good']
        // script.js:36 (10) ['BRC', 'Beret Cap', 88, 341, 343, 456, 234, 1462, '3.28', 'Good']
        // script.js:36 (10) ['SNV', 'Sun Visor', 12, 44, 123, 233, 88, 500, '3.68', 'Good']
        // script.js:36 (10) ['BKC', 'Bucket Cap', 56, 77, 44, 23, 17, 217, '2.39', 'Poor']
        // script.js:36 (10) ['PNC', 'Panama Cap', 78, 389, 545, 241, 112, 1365, '2.94', 'Good']
        // script.js:36 (10) ['FLC', 'Flat Cap', 37, 201, 358, 332, 123, 1051, '3.29', 'Good']
        // script.js:36 (10) ['CBC', 'Cowboy Cap', 19, 42, 112, 215, 99, 487, '3.68', 'Good']

        if (averageRating >highestAvg) {
            highestAvg = averageRating;
            capWithHighestAvg = capData.cap; 
        }

    }
            
});
