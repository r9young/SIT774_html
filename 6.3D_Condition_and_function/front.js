
function populateTable(data) {
    const tbody = document.getElementById('capTableBody');
    tbody.innerHTML = '';  // Clear any existing rows

    data.capratings.forEach(row => {
        const tr = document.createElement('tr');

        const capCell = document.createElement('td');
        capCell.textContent = row.cap;
        tr.appendChild(capCell);

        row.stars.forEach(star => {
            const starCell = document.createElement('td');
            starCell.textContent = star;
            tr.appendChild(starCell);
        });

        tbody.appendChild(tr);
    });
}

const showDataBtn = document.getElementById('showDataBtn');

showDataBtn.addEventListener('click', population);

function population() {
    setTimeout(function() {
        // Fetch the JSON data after waiting for the file to be created
        fetch('../data.json')
            .then(response => response.json())
            .then(data => {
                populateTable(data);
                // Uncomment these if you have these functions defined and want to use them
                // calcCapRatingTotal(data);
                // calcCapAverageRating(data);
            })
            .catch(error => {
                console.error('Error loading JSON:', error);
            });
    }, 1000); // Set the delay in milliseconds (e.g., 1000ms = 1 second)
}





// function calcCapRatingTotal(capRatingsArray) {
//     // Sum all the values in the capRatingsArray
//     return capRatingsArray.reduce((total, rating) => total + rating, 0);
// }


// function calcCapAverageRating(capRatingsArray) {
//     // Calculate the weighted sum of ratings
//     const weightedSum = 
//         (capRatingsArray[0] * 1.0) + 
//         (capRatingsArray[1] * 2.0) + 
//         (capRatingsArray[2] * 3.0) + 
//         (capRatingsArray[3] * 4.0) + 
//         (capRatingsArray[4] * 5.0);
    
//     // Calculate the total number of ratings
//     const totalRatings = calcCapRatingTotal(capRatingsArray);
    
//     // Return the average rating
//     return weightedSum / totalRatings;
// }
