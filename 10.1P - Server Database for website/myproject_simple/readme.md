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


-----------------------------


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


-----------------------------------------

# Adding other element into the webpage

bug: 

Question 1: some of element on my webpage have id but some of them don't 
e.g mobile we have an id="inputMobile" but for  Number of caps owned, there is no id. 

so we extract the value of fistname and surename by using getElement. how about Number of caps owned, how could we get value?

script.js

```javascript

document.getElementById('postMembershipForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const firstname = document.getElementById('inputFirstname').value;
    const surename = document.getElementById('inputSurname').value;

    if (!firstname || !surename) {
        alert('Please fill in all required fields.');
        return; // Stops the execution of the code, so the fetch request won't run
    }

    try {
        // Send data to the server
        const response = await fetch('http://localhost:4000/submitmembership', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ firstname, surename }) // Convert to JSON string
        });

        // Handle the server response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.redirected) {
            // Redirect to the thankyou page
            window.location.href = response.url;
        }


    } catch (error) {
        console.error('Error:', error); // Handle any errors that occur
    }
});


```


```javascript


 <div class="row mb-3">
    <label for="inputMobile" class="col-sm-2 pt-2 col-form-label-sm text-sm-end">
        Mobile:
    </label>
    <div class="col-sm-10">
        <input type="tel" class="form-control" id="inputMobile" name="mobileNumber"
            placeholder="04xxxxxxxx" title="Invalid Number 04xxxxxxxx" pattern="[0-9]{10}" >
    </div>
</div>

<div class="row mb-3">
    <legend for="inputNumCaps" class="col-sm-2 pt-2 col-form-label-sm text-sm-end" name="inputNumCaps">
        Number of caps owned:
    </legend>
    <div class="col-sm-10 pt-2">
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="inlineCheckbox1" name="inputNumCaps"
                value="0 caps">
            <label class="form-check-label" for="inlineCheckbox1">No caps yet</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="inlineCheckbox2" name="inputNumCaps"
                value="1 - 10 caps">
            <label class="form-check-label" for="inlineCheckbox2">Between 1 and 10
                caps</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="inlineCheckbox3" name="inputNumCaps"
                value="11 - 29 caps">
            <label class="form-check-label" for="inlineCheckbox3">Between 11 and 29
                caps</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="inlineCheckbox4" name="inputNumCaps"
                value="30+ caps">
            <label class="form-check-label" for="inlineCheckbox4">More than 30 caps</label>
        </div>
    </div>
</div>

```

--------------------



Bug: found that code in script.js and index.js are duplicating tasks:

Below are the analysis from GPT:


There are some parts of your code that are duplicating tasks, both in the `Node.js` backend and the client-side `script.js`. Here's a breakdown:

1. **Validation of Required Fields**:
   - **Frontend (script.js)**: You are already validating if all required fields are filled on the client-side before submitting the form.
   - **Backend (Node.js)**: You are repeating the same validation on the server-side by checking for empty fields in the `postData` function.

   **Solution**: Keep both client-side and server-side validation. However, the client-side validation can prevent unnecessary requests from being made, while server-side validation is essential to ensure data integrity (in case someone bypasses the client-side check).

2. **Data Extraction**:
   - **Frontend (script.js)**: You extract form data from the HTML elements using `document.getElementById()` and `querySelector()` and then send the data via `fetch` as JSON.
   - **Backend (Node.js)**: You extract the same fields from `req.body` after the form is submitted.

   **Solution**: This is not a duplication; it's necessary. The frontend extracts data to send it to the server, while the backend extracts it to process the data. Each part is performing its respective role correctly.

3. **Redundant Error Handling**:
   - **Backend (Node.js)**: After inserting into the database, you redirect the user to the `thankyou` page using `res.redirect()`.
   - **Frontend (script.js)**: You check for a redirect in the server response using `response.redirected` and handle it.

   **Solution**: This setup is fine as long as you need the frontend to be aware of the redirection. If the server handles the redirection automatically, you could remove the `response.redirected` check from the frontend, as the browser will handle the redirection. However, keeping this logic on the frontend allows more control and flexibility.

In summary:
- **Keep both client-side and server-side validation** for security and user experience reasons.
- **Data extraction is necessary on both sides** (frontend for sending, backend for processing).
- **You can simplify the frontend redirect logic** if you don't need extra control over the redirection behavior.

If you're aiming for efficiency and simplicity, removing unnecessary checks or error handling where redundant can help streamline the process.

----------------------------


bug: Reference Error

```

ReferenceError: /Users/r9young/Library/Mobile Documents/com~apple~CloudDocs/Coding/html - SIT774/10.1P - Server Database for website/myproject_simple/views/thankyou.ejs:41
    39|                         <tr>
    40|                             <th scope="row" style="width: 20%;">Mobile</th>
 >> 41|                             <td style="width: 80%;"><%= mobile %></td>
    42|                         </tr>
    43|                         <tr>
    44|                             <th scope="row" style="width: 20%;">Cap Style</th>

```


Fixed: Reference Error
commit db71b339e654a789272e6d71ac85bb73082f2065

The name of the elements extracted from `req.body` should exactly match the names defined in your form on `index.ejs`. If you want to change the name of a variable, you'll need to use the aliasing approach, like `inputNumCaps: numcaps`, as you've mentioned. Then, when rendering the `res.render` function, you need to ensure that you're using the variable names consistently.

Here’s an example of how to apply the changes while keeping everything consistent between `req.body`, the extracted variables, and the `res.render` function:

1. **Ensure form field names (in `index.ejs`) match what you expect to extract from `req.body`.**
2. **If you alias a variable (e.g., `inputNumCaps: numcaps`), use the aliased name (`numcaps`) in `res.render`.**


### Important notes:
1. **Form names in `index.ejs`**: Make sure the names in your form (in `index.ejs`) are consistent with what you expect to extract from `req.body`. For example, if your form has `<input name="inputNumCaps">`, you should extract it as `inputNumCaps`, and alias it to `numcaps` if you want.
   
2. **Aliasing variables**: When you alias `mobileNumber` as `mobile`, you should use `mobile` in the rest of the code, including in `res.render`.

3. **Consistency in `res.render`**: Ensure that the names passed in `res.render` match the aliased variable names. For example, if you alias `mobileNumber` as `mobile`, you should pass `mobile` to the template, not `mobileNumber`.

This approach should resolve any issues related to variable names not matching between your form, the server code, and the rendering in the views.



-------------------------------


bug: how can connect the button with endingpoing


```html

<h5 class="mt-4">List Feedback</h5>
<p>
The following button will issue a <code>GET</code> request to the <code>/feedback</code>
route to retrieve feedback stored in the DB.
</p>
<div class="d-grid gap-5d-md-flex justify-content-md-center mb-4">
<form action="/feedback" method="GET">
<button class="btn btn btn-success" id="getfeedbackBtn" type="submit" >
    Retrieve Membership Details From Database
</button>

```

```js 


app.get('/feedback', (req, res) => {
    getData(res);
    // res.send('Data fetched and logged to console');
});

// Function to fetch data from the 'users' table
const getData = (res) => {
    const sql = `SELECT id, 
                firstname, 
                surename, 
                mobile, 
                email, 
                capsOwned,
                capstyles, 
                comments FROM users`; // Query for firstname and surname from 'users' table

    db.all(sql, [], (err, rows) => {
        if (err) {
            
            console.error(err.message);
            return res.status(500).send('An error occurred while fetching the data.');
        }

        res.render('submit', { title: 'Thank You', rows: rows });
    });
};

```



Fixed:

```js

app.get('/feedback', (req, res) => {
    getData(res);
    // res.send('Data fetched and logged to console');
});

// Function to fetch data from the 'users' table
const getData = (res) => {
    const sql = `SELECT * FROM users`; // Query for firstname and surname from 'users' table

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('An error occurred while fetching the data.');
        }

        res.render('submit', { title: 'Thank You', rows: rows });
    });
};

```

```html

   <form action="/feedback" method="GET">
        <button class="btn btn-success" id="getfeedbackBtn" type="submit">
            Retrieve Membership Details From Database
        </button>
    </form>
```
