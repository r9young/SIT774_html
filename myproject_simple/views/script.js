document.getElementById('postMembershipForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const firstname = document.getElementById('inputFirstname').value;
        const surename = document.getElementById('inputSurname').value;

        if (!firstname || !surename) {
            alert('Please fill in all required fields.');
            return;// Stops the execution of the code, so the fetch request won't run
        }
    
        const response = await fetch('http://localhost:3000/saveUser', {
            method: 'POST', // send data to the server
            headers: { 'Content-Type': 'application/json' }, // tell server that the request body contains JSON data. 
            body: JSON.stringify({ firstname, surename}) //convert two values into a JSON  string
        });

        const result = await response.json();
        alert(result.message);

});

