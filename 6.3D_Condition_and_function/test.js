function population() {
    // Fetch the JSON data after waiting for the file to be created
    fetch('test.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data loaded successfully:", data);
            data.capratings.forEach(capRating => {
                const capRatingsArray = capRating.stars;

                // Calculate total ratings for each cap
                const totalRatings = calcCapRatingTotal(capRatingsArray);

                // Calculate average rating for each cap
                const averageRating = calcCapAverageRating(capRatingsArray);

                console.log(`Cap: ${capRating.cap}`);
                console.log(`Total Ratings: ${totalRatings}`);
                console.log(`Average Rating: ${averageRating.toFixed(2)}`);
            });
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
}

// Example usage of the existing functions:
function calcCapRatingTotal(capRatingsArray) {
    return capRatingsArray.reduce((total, rating) => total + rating, 0);
}

function calcCapAverageRating(capRatingsArray) {
    const weightedSum = 
        (capRatingsArray[0] * 1.0) + 
        (capRatingsArray[1] * 2.0) + 
        (capRatingsArray[2] * 3.0) + 
        (capRatingsArray[3] * 4.0) + 
        (capRatingsArray[4] * 5.0);

    const totalRatings = calcCapRatingTotal(capRatingsArray);

    return weightedSum / totalRatings;
}
