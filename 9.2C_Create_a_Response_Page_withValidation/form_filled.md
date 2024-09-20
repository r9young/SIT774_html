Yes, you can apply the same concept in **EJS (Embedded JavaScript)** templates if you're using Node.js and Express.js for server-side rendering. Here's how you can handle this:

### 1. **Setup Your Node.js Express Project**

First, make sure you have Express and EJS installed:

```bash
npm install express ejs
```

### 2. **Create the Folder Structure**

Your folder structure might look like this:

```
- views/
  - form.ejs
  - fillForm.ejs
- app.js
```

### 3. **Code for `app.js`**

This will be the main server-side code to render the pages and handle the form data.

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to render the form (Page A)
app.get('/form', (req, res) => {
  res.render('form');
  // when the form is submitted, the browser automatically sends the data from the form fields (like the name input) as part of the POST request body. This is a standard behavior in web forms.
});

// Route to handle form submission and render filled form (Page B)
app.post('/fillForm', (req, res) => {
  const name = req.body.name;
  res.render('fillForm', { name });
  // {name} pass the name variable to to the fillForm.ejs file.
  // it is rendering the fillForm.ejs file, which is located in the "views" directory by default.
  // The server passes the name value to fillForm.ejs using res.render('fillForm', { name }).

});

// Start the server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
```

### 4. **EJS Template for Page A (`form.ejs`)**

This page will contain the form where the user enters their data.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page A: Form</title>
</head>
<body>
  <h1>Page A: Input Form</h1>
  
  <form action="/fillForm" method="POST">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name" required>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

### 5. **EJS Template for Page B (`fillForm.ejs`)**

This page will display the form filled with the data from **Page A**.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page B: Filled Form</title>
</head>
<body>
  <h1>Page B: Form Filled</h1>
  
  <form>
    <label for="filledName">Your name:</label>
    <input type="text" id="filledName" name="filledName" value="<%= name %>" readonly>
  </form>
</body>
</html>
```

### Explanation:

1. **Server Setup (`app.js`)**:
   - The `/form` route renders **Page A** (`form.ejs`) where the user can input their name.
   - After submitting the form, the `POST` request to `/fillForm` passes the user's input to the server.
   - The `/fillForm` route renders **Page B** (`fillForm.ejs`), filling the form with the user's name, which was passed as a variable.

2. **Page A (`form.ejs`)**:
   - A simple form where the user submits their name. The form submits via `POST` to `/fillForm`.

3. **Page B (`fillForm.ejs`)**:
   - This page renders the name submitted from **Page A** and fills it into the form field using `<%= name %>`, which outputs the server-side variable passed from `app.js`.

### Running the App:

1. Run the server:

   ```bash
   node app.js
   ```

2. Open your browser and go to [http://localhost:3000/form](http://localhost:3000/form).
3. Enter a name and submit the form. You’ll be redirected to **Page B** where the form is pre-filled with the name you submitted.

This approach uses server-side rendering with EJS to pass data between two pages.