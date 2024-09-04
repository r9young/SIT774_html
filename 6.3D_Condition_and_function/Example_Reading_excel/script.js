let btn = document.querySelector('#loadExcel');
btn.addEventListener('click', () => {
    // Directly use the JSON data defined in the script
    const capRatingListJSON = { //javascript Object
        capratings: [ // property name --> arrary
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
        // capratings?? capratings is a property of json object (capRatingListJSON)
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
        
        // ...capData??
        // capData.stars --> Refers to the array of numbers [12, 34, 532, 321, 77].
        // ...capData --> The spread operator (...) takes each element of the array [12, 34, 532, 321, 77] and spreads them out as individual elements.
        // generateTableRows(table, rowData);
        
        // Add the row and get the newly created row
        let newRow = generateTableRows(table, rowData);

        // Change the color of the "Rating Category" cell only
        setColor(newRow, ratingCategory);
        
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
        let newRow = table.insertRow(-1);
        // ensure each new row is added as the last row of the table
        data.forEach(cellData => {
            let newCell = newRow.insertCell();
            let newText = document.createTextNode(cellData);
            newCell.appendChild(newText);
        });
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

    function setColor(column) {
        let ratingCategoryCell = row.cells[col.cells.length - 1]; // Get the last cell in the row (rating category)
        ratingCategoryCell.color = "gray"; // Apply color to the cell
    }
    
});
