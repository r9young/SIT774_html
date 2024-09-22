document.getElementById('postMembershipForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const firstname = document.getElementById('inputFirstname').value;
        const surename = document.getElementById('inputSurname').value;
        // const email = document.getElementById('inputEmail').value;
        // const mobile = document.getElementById('inputMobile').value;
        // const inputNumCaps = document.getElementById('inputNumCaps').value;
        // const capstyles = document.getElementById('capstyles').value;
        // const comments = document.getElementById('comments').value;
   

        if (!firstname || !surename) {
            alert('Please fill in all required fields.');
            return;// Stops the execution of the code, so the fetch request won't run
        }
    


        // Send data to the server
        // sending data from the front-end to the back-end and saving it to the database.
        // sending data from the front-end is in Endpoint of node.js
        const response = await fetch('http://localhost:3000/saveUser', {
            method: 'POST', // send data to the server
            headers: { 'Content-Type': 'application/json' }, // tell server that the request body contains JSON data. 
            // body: JSON.stringify({ firstname, surename, email, mobile, inputNumCaps, capstyles, comments }) //convert two values into a JSON  string

            body: JSON.stringify({ firstname, surename}) //convert two values into a JSON  string
        });

        const result = await response.json();
        alert(result.message);

        // Clear form
        // document.getElementById('name').value = '';
        // document.getElementById('email').value = '';

        // Fetch updated user list
        // fetchUsers();
});

