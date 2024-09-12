

document.getElementById('likeGreyBtn').addEventListener('click', () => {

  console.log("User click the button");
  
  fetch('/likegrey', {
    method: 'POST'  // Correct way to set the HTTP method
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    // alert(data)})
  })
  .catch(error => console.error('Error:', error));
});


// document.getElementById('likeGreyBtn').addEventListener('click', () => {
//   fetch('/likegrey', {
//     method: 'POST',
//   })
//   .then(response => response.text())  // Convert response to text
//   .then(data => {
//     // Replace the current page content with the server response (the new HTML page)
//     document.documentElement.innerHTML = data;
//   })
//   .catch(error => console.error('Error:', error));
// });
