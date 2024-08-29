const xlsx = require('xlsx');


// Function to read data from Excel and convert to JSON
function excelToJson(filePath) {
    // Load the workbook
    const workbook = xlsx.readFile(filePath);

    // Get the first sheet (assuming the data is in the first sheet)
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to JSON format
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    return jsonData;
}

// Example usage
const filePath = './data/data.xlsx';
const jsonData = excelToJson(filePath);

console.log(JSON.stringify(jsonData, null, 2)); // Pretty-print the JSON

// ------ Transform JSON Data to Desired Structure -----------

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

// Example usage:
const transformedData = transformToCapRatingJSON(jsonData);
console.log(JSON.stringify(transformedData, null, 2));
