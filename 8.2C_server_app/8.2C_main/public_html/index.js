
//Grey Cap
document.getElementById('likeGreyBtn').addEventListener('click', () => {

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


document.getElementById('likeYellowBtn').addEventListener('click', () => {

  console.log("User click the button");
  
  fetch('http://localhost:3000/likeyellow', {
    // console.log(data);
    method: 'POST'  // Correct way to set the HTTP method
  })
  // by using "fetch & POST", the client-side JavaScript is telling the server-side JavaScript to handle the request.
  // The Express.js server listens for incoming requests.
  // the POST request made by the client is directly related to the response (res) sent by the server.  
  //The POST request and response (res) are two sides of the same interaction

  .then(response => response.text())
  .then(data => {
    // console.log(data);
    // alert(data)})
  })
  .catch(error => console.error('Error:', error));
});
