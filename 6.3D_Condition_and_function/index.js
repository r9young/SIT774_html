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
