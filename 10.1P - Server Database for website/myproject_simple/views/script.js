document.getElementById('postMembershipForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const firstname = document.getElementById('inputFirstname').value;
    const surename = document.getElementById('inputSurname').value;
    const mobile = document.getElementById('inputMobile').value;
    const email = document.getElementById('inputEmail').value;
    const capsOwned = document.querySelector('input[name="inputNumCaps"]:checked')?.value; 
    const capstyles = document.querySelector('input[name="capstyles"]:checked')?.value; 
    const comments = document.getElementById('comments').value;

    if (!firstname || !surename || !mobile || !email || !capsOwned || !capstyles || !comments) {
        alert('Please fill in all required fields.');
        return; // Stops the execution of the code, so the fetch request won't run
    }

    try {
        // Send data to the server
        const response = await fetch('http://localhost:4000/submitmembership', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ firstname, surename, mobile ,email, capsOwned, capstyles, comments }) // Convert to JSON string
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


document.getElementById('getfeedbackBtn').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'http://localhost:4000/membershipdetails';
});
