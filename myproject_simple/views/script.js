document.getElementById('postMembershipForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const firstname = document.getElementById('inputFirstname').value;
    const surename = document.getElementById('inputSurname').value;

    if (!firstname || !surename) {
        alert('Please fill in all required fields.');
        return; // Stops the execution of the code, so the fetch request won't run
    }

    try {
        // Send data to the server
        const response = await fetch('http://localhost:4000/submitmembership', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ firstname, surename }) // Convert to JSON string
        });

        // Handle the server response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.redirected) {
            // Redirect to the thankyou page
            window.location.href = response.url;
        }


    } catch (error) {
        console.error('Error:', error); // Handle any errors that occur
    }
});


document.getElementById('getfeedbackBtn').addEventListener('submit', async function(e) {
    e.preventDefault();

    try {
        // Send data to the server
        const get = await fetch('http://localhost:4000/membershipdetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ id, firstname, surename }) // Convert to JSON string
        });
    } catch (error) {
        console.error('Error:', error); // Handle any errors that occur
    }
})