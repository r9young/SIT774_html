const fs = require('fs');
const xlsx = require('xlsx');

// Simulate the generateTableHead and generateTableRows functions
function generateTableHead(row) {
    console.log("Table Head:", row);
}

function generateTableRows(row) {
    console.log("Table Row:", JSON.stringify(row));
}


function test_blob() {
    const filePath = './data.xlsx';
    // Read the Excel file from the file system
    const fileBuffer = fs.readFileSync(filePath);
    //readFileSync is a method provided by the 'fs' module that reads the entire contents of the a file. 

    // Parse the Excel file using xlsx package
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Get the name of the first sheet
    const worksheet = workbook.Sheets[sheetName]; // Access the first worksheet
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); 
    //is used to convert the contents of an Excel worksheet into a JSON-compatible format

    // Simulate the blob object by logging the file size and type
    // const blob = {
    //     size: fileBuffer.length,
    //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    // };
    // console.log(blob);

    // Process rows
    rows.map((row, index) => {
        if (index === 0) {
            generateTableHead(row);
        } else {
            generateTableRows(row);
        }
    });
}

// Call the function
test_blob();
