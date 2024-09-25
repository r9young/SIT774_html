Purpose of this project is to make the code simpler to test the node.js and database connections

npm install express sqlite3 cors ejs


Bug: 

    {
        "message": "Missing required fields"
    }

Fixed:


app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'script.js'));
});


and 


const response = await fetch('http://localhost:4000/saveUser', {

}


result: your server and database are working correctly



--------------------------------


Debug:

script.js:22 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'json') at HTMLFormElement.<anonymous> (script.js:22:35)
(anonymous) @ script.js:22Understand this error
content.js:2 Error: <svg> attribute viewBox: Expected number, "0 0 100% 4".



```javascript

document.getElementById('postMembershipForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const firstname = document.getElementById('inputFirstname').value;
    const surename = document.getElementById('inputSurname').value;

    if (!firstname || !surename) {
        alert('Please fill in all required fields.');
        return;// Stops the execution of the code, so the fetch request won't run
    }

    const response = await fetch('http://localhost:4000/saveUser', {
        method: 'POST', // send data to the server
        headers: { 'Content-Type': 'application/json' }, // tell server that the request body contains JSON data. 
        body: JSON.stringify({ firstname, surename}) //convert two values into a JSON  string
    })
    .then(response => response.json())
    .then(data => console.log(data)) // Handle server response
    .catch(error => console.error('Error:', error));

    // const result = await response.json();
    // console.log(result); // Use the parsed JSON data

});

```

Problems is:  async/await or .then() cannot be used at the same time.


fixed


--------------------------------------------------------------------


next step: we will add membershipdetails page, we will use thankyou.ejs as a reference. 

**Issue 1:** Initially, we run `createDB.js` using `node createDB.js` to set up the database. However, when using `index.js` to fetch data, how should we manage that? Do we simply run `node index.js`?


Here’s how it works:

- **`createDB.js`**: This file is only for **initializing** or **setting up** your SQLite database. You run it once when you need to **create or populate** your database. After that, you don’t need to run it again unless you want to reset or change the database structure.

- **`index.js`**: Once the database is set up, you only need to run `index.js` to **fetch data** or handle any other database operations. This is the main file you’ll use to manage your app.


- **how to drop the entire table in database.sqlite**

sqlite3 database.sqlite

DROP TABLE table_name;

but finally,I believe that my code is ok because it included the table creation function which only creates tables if the table does not exist


Issue 2: need a sample code to GET data from database - database.sqlite

Sample code

```javascript

const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
let db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Function to fetch data from the 'users' table
const getData = () => {
  const sql = `SELECT firstname, surname FROM users`; // Query for firstname and surname from 'users' table

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    // Loop through the rows and log the data
    rows.forEach((row) => {
      console.log(`Firstname: ${row.firstname}, Surname: ${row.surname}`);
    });
  });
};

// Call the function to get data
getData();

// Close the database connection when done
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});

```


----------------------------------------------------

### Rendering Dynamic Table Rows in EJS Templates Using Data from a Database


becasue each user's information will be rendered in a new line and rendered in the same column as the use of the same data source. 

Here's how you can modify your code to fix the issue:

Collect all rows in an array.
Pass the entire array to the EJS template.
Update the getData function in index.js:

```javascript
const getData = (res) => {
    const sql = `SELECT firstname, surename FROM users`; // Query for firstname and surname from 'users' table

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        // Render the 'thankyou' template with the rows data
        res.render('thankyou', { title: 'Thank You', rows: rows });
    });
};
```

Update your EJS template (thankyou.ejs) to iterate over the rows array:

```javascript

<table>
    <tr>
        <th>First Name</th>
        <th>Sure Name</th>
    </tr>
    <% rows.forEach(function(row) { %>
        <tr>
            <td style="width: 80%;"><%= row.firstname %></td>
            <td style="width: 80%;"><%= row.surename %></td>
        </tr>
    <% }); %>
</table>

```

With these changes:

The getData function fetches all rows from the database and passes them to the thankyou template.
The thankyou.ejs template iterates over the rows array and creates a table row for each entry.
This should resolve the error and correctly render the data in your EJS template.


----------------------------------------------------------------

25/09/2024 

Goal: Adding "List is Empty" in localhost:3000/membershipdetails, when there is no memberships in the database. 

-------------------------------------------------------------------------------------------------------------------------------

Debug: When I click on "Retrieve Memberships Details from Database"

script.js:52 Error: ReferenceError: firstname is not defined
    at HTMLButtonElement.<anonymous> (script.js:48:36)


Fixed: it is just a code type issue. 
commit 53456af72b7bf536d263b03bb26edd89ab182c15


----------------------------------------------------------------

Bug: I updated the code below, but retrieved button go to localhost:3000/feedback
I am trying to figure out why it is going to feedback


```javascript

const getData = (res) => {
    const sql = `SELECT firstname, surename FROM users`; // Query for firstname and surname from 'users' table

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length === 0) { // If no records are found, send a message to the client
            res.send('No records found in the database.');
        } else {
            // Loop through the rows and log the data
            rows.forEach((row) => {
                console.log(`ID: ${row.id}, Firstname: ${row.firstname}, Surname: ${row.surename}`);
            });
            res.render('submit', { title: 'Thank You', rows: rows });
        }
    });
};

```


Potential Issues:


```html

<a href="/feedback">
  <button class="btn btn btn-success" id="getfeedbackBtn" type="submit" >
      Retrieve Membership Details From Database
  </button>
</a>

```

Bug Fixed: After change <a href="/feedback"> to <a href="/membershipdetails">
commit 3e3835fd26d2057c1c6a6dd16c749adb0d7cb3d2


-------------------------------------------------------------------------------

Question: But I have a question of above question. I have my javascript and node.js. Why the page still go to /feedback. but with a users's record, the page goes to /membershipdetails. 

Anwswer: pending


-------------------------------------------------------------------------------


Bug:

 
node.js

```javascript


db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    // Loop through the rows and log the data
    rows.forEach((row) => {
        console.log(`ID: ${row.id}, Firstname: ${row.firstname}, Surname: ${row.surename}`);
        res.render('submit', { title: 'Thank You', rows: rows });
    });
});

```


Bug Fixed:



Moving theres.render('submit', { title: 'Thank You', rows: rows }); out of foreach loop.


using rows.forEach to iterate over the rows, but inside the loop, you're logging the row.id, even though you're not selecting id in your SQL query. This will result in an undefined row.id.

```javascript

db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }

    // Log data to console (optional, for debugging)
    rows.forEach((row) => {
        console.log(`ID: ${row.id}, Firstname: ${row.firstname}, Surname: ${row.surename}`);
    });

    // Render the 'submit' view after fetching data
    res.render('submit', { title: 'Thank You', rows: rows });
});

```

