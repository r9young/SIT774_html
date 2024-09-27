27/09/2024

## Is the res, req method only used in ejs file?


No, `res` (response) and `req` (request) are not specific to EJS (Embedded JavaScript) files. These objects are part of the HTTP request-response cycle in Node.js and Express.js. They can be used in any Express route, regardless of whether you're rendering EJS templates or returning other data formats (e.g., JSON, HTML, or plain text).

- `req`: Contains information about the incoming request (e.g., headers, query parameters, body).
- `res`: Used to send a response back to the client (e.g., sending HTML, JSON, or rendering an EJS view).

```javascript


const searchData = (req, res) => {
    const { searchInput, searchOption } = req.body; 
    // attempting to extract the searchInput and searchOption values from the body of the request that is being sent from your website
    console.log(searchInput, searchOption);
    res.render('search', { title: 'Thank You', searchInput, searchOption });
    // search is the name of the template file you want to render.
}

```

To summarize:
- `req` is **receiving** data from the current webpage.
- `res` is **sending** data and rendering a response back to the webpage (in this case, by rendering the 'search' template with the data).


-----------------------------------------------------


## Asked ChatGPT to write an example from input, search and display

Certainly! Below is an example of a simple Node.js application that serves a main page where users can input search content. When the form is submitted, it queries a `database.sqlite` SQLite database and displays the search results on the `/search` page.

### 1. HTML: `index.html`

Create an `index.html` file inside a `public` folder:

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Search Page</title>
</head>
<body>
    <h1>Search Database</h1>
    <form action="/search" method="GET">
        <input type="text" name="query" placeholder="Enter search term" required>
        <button type="submit">Search</button>
    </form>
</body>
</html>
```

This HTML file contains a simple form with a text input for the search term and a submit button. When submitted, it sends a GET request to `/search` with the query parameter.

### 2. Node.js Application: `app.js`

Create an `app.js` file in the root directory:

```javascript
// app.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();

// Connect to SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle search queries
app.get('/search', (req, res) => {
    const query = req.query.query;

    // SQL statement to search the database
    const sql = "SELECT * FROM items WHERE name LIKE ?";
    const params = [`%${query}%`];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            // Display search results
            let html = '<h1>Search Results</h1>';
            if (rows.length > 0) {
                html += '<ul>';
                rows.forEach((row) => {
                    html += `<li>${row.name}</li>`;
                });
                html += '</ul>';
            } else {
                html += '<p>No results found.</p>';
            }
            res.send(html);
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

This Node.js application does the following:

- Connects to a SQLite database named `database.sqlite`.
- Serves the `index.html` file at the root URL (`/`).
- Handles GET requests to `/search`, retrieves the `query` parameter, searches the database, and displays the results.

### 3. Setting Up the SQLite Database

Create a SQLite database named `database.sqlite` and a table named `items`:

```sql
-- You can run this SQL in a SQLite client

CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Insert sample data
INSERT INTO items (name) VALUES ('Apple');
INSERT INTO items (name) VALUES ('Banana');
INSERT INTO items (name) VALUES ('Cherry');
```

### 4. Install Dependencies

Make sure you have Node.js installed. Then, install the necessary packages:

```bash
npm init -y
npm install express sqlite3
```

### 5. Run the Application

Start the Node.js application:

```bash
node app.js
```

Open your web browser and navigate to `http://localhost:3000/`. You should see the search page. Enter a search term (e.g., "Apple") and submit the form. The application will query the SQLite database and display matching results on the `/search` page.

---

This example demonstrates how to create a simple search functionality using HTML and Node.js with a SQLite database.


-----------------------------------------------

<h2>Working Progress: 27/09/2024, 11:29<h2>
<ul style="color: orange;"> 
    <li>Build teh search.js</li>
    <li>Create endpoint /search, Successfully tested</li>
    <li>Next, we will review the above example created by Chatgpt</li>
    <li>Contine the const sql</li>
</ul>



