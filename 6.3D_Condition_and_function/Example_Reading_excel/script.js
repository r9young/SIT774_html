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
        // Get the headers to find the index of the column by name
        let table = row.closest('table'); // Find the table
        let headers = table.querySelectorAll('th'); // Get all table headers
        
        // Find the index of the column with the specified name
        let columnIndex = Array.from(headers).findIndex(header => header.textContent === columnName);
        
        if (columnIndex !== -1) {
            // Get the cell for the found column index
            let ratingCategoryCell = row.cells[columnIndex]; 
            ratingCategoryCell.style.backgroundColor = "#d3d3d3"; // Set the background color to white
        } else {
            console.error(`Column "${columnName}" not found.`);
        }
    }
    
});
