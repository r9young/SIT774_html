document.getElementById('likeGreyBtn').addEventListener('click', () => {
    fetch('/like-grey', {
      method: 'POST'
    })
    .then(response => response.text())
    .then(data => alert(data))  // Show the server's response in an alert
    .catch(error => console.error('Error:', error));
});