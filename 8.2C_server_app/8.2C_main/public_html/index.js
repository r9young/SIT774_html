//Grey Cap
document.getElementById('likeGreyBtn').addEventListener('submit', () => {

  console.log("User click the button");
  
  fetch('/likegrey', {
    method: 'POST'  // Correct way to set the HTTP method
  })

  // by using "fetch & POST", the client-side JavaScript is telling the server-side JavaScript to handle the request.
  // The Express.js server listens for incoming requests.
  // the POST request made by the client is directly related to the response (res) sent by the server.  
  //The POST request and response (res) are two sides of the same interaction

  .then(response => response.text())
  .then(data => {
    console.log(data);
    // alert(data)})
  })
  .catch(error => console.error('Error:', error));
});


document.getElementById('likeYellowBtn').addEventListener('submit', () => {
  console.log("User clicked the Yellow button");

  fetch('/likeyellow', {
    method: 'POST'  // Send a POST request to the server
  })
  .then(response => response.text())  // Handle the response as text
  .then(data => {
    console.log(data);  // Log the server's response
    // You can also update the UI with the response data
  })
  .catch(error => console.error('Error:', error));  // Handle errors
});