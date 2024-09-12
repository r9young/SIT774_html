

document.getElementById('likeGreyBtn').addEventListener('click', () => {

  console.log("User click the button");
  
  fetch('/likegrey', {
    method: 'POST'  // Correct way to set the HTTP method
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    alert(data)})
  .catch(error => console.error('Error:', error));
});
