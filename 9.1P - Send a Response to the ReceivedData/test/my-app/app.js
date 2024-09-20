const express = require('express');
const path = require('path');
const app = express();

// Set the directory for EJS views
app.set('views', path.join(__dirname, 'views')); // This ensures it looks in the right folder
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    name: 'John Doe',
    items: ['Apple', 'Banana', 'Orange']
  };
  res.render('index', data);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
