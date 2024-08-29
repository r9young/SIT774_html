<!-- ## Use the JSON array of objects provided to store the Cap Rating details and information.

## Define Javascript functions that builds and populates the table (and summary infromation) when the button is clicked, i.e., implements the  buildCapRatingList() funciton.

## Define a set support Javascript functions to return the Full Cap Name, Total

## Number of Ratings, Average Cap Rating and the Average Cap rating category.

## Use a table to organize the displayed data.

## Use additional variables to keep a total of the total cap ratings submitted and the index of the best & worst rated caps; these can be updated in the loop as you build the html to display the cap’s row. -->


# 1. Install the `xlsx` library

issue

The error you encountered indicates that your npm cache folder contains files that are owned by the root user, which is preventing npm from installing packages correctly. You can resolve this issue by changing the ownership of the `.npm` folder to your user account. Here’s how to fix it:

### Step 1: Change Ownership of the `.npm` Folder

**installation failed**
**solution**

Run the following command to change the ownership of the `.npm` directory to your current user:

```bash
sudo chown -R $(whoami) ~/.npm
```

### Step 2: Retry the Installation
After changing the ownership, try installing the `xlsx` package again:

```bash
npm install xlsx
```

### relative path vs abosolute path

Yes, that's correct. If you use an **absolute path** (like `/data/data.xlsx`), your script will still be able to find the file regardless of where the script itself is located, as long as the file is located at `/data/data.xlsx` on the file system.

### Key Points:

- **Absolute Path (`/data/data.xlsx`)**:
  - This path is tied to the root of the file system, meaning that it starts at `/`, which is the root directory.
  - No matter where your script is located or from where it is executed, if the file exists at `/data/data.xlsx`, the script will find it.
  - **Example**: If you move your script to `/Users/r9young/new_location/script.js`, and your script references `/data/data.xlsx`, it will still be able to access the file as long as the file is indeed located at `/data/data.xlsx`.

    if you build another folder structure that is exactly the same as your original structure but place it somewhere else in the filesystem, the absolute path will become invalid. This is because an absolute path starts from the root directory (/), and it is not dependent on the structure of your project or where the project is located.

- **Relative Path (`./data/data.xlsx`)**:
  - This path is relative to the directory from which you run the script. If you move the script to a different location, the relative path may no longer correctly reference the file unless the relative structure remains the same.
  - **Example**: If you move your script to `/Users/r9young/new_location/` and run it from there, it will look for `data/data.xlsx` inside `/Users/r9young/new_location/`. If the `data` directory does not exist there, it won't find the file.

## Resulting JSON Structure

name of row must be exactly same on json datase


```javascript

function transformToCapRatingJSON(data) {
  const capRatingListJSON = {
      capratings: data.map(row => ({
          cap: row['Cap'],  // Replace with your actual column header
          stars: [
              row['1-star'],  // Replace with your actual column headers
              row['2-star'], 
              row['3-star'], 
              row['4-star'], 
              row['5-star'],
              row['__EMPTY'],
              row['__EMPTY_1'],
          ]
      }))
  };
  return capRatingListJSON;
}

```

 {
      "cap": "FLC",
      "stars": [
        37,
        201,
        358,
        332,
        123,
        3.2882968601332063,
        1051
      ]
    },
``


## Populating the table