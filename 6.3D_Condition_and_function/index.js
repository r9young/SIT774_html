const fs = require('fs');
const xlsx = require('xlsx');

// Function to read data from Excel and convert to JSON
function excelToJson(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
}

const filePath = './data/data.xlsx';
const jsonData = excelToJson(filePath);

// Transform JSON Data to Desired Structure
function transformToCapRatingJSON(data) {
    const capRatingListJSON = {
        capratings: data.map(row => ({
            cap: row['Cap'],s: [
                row['1-star'],
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

const transformedData = transformToCapRatingJSON(jsonData);
fs.writeFileSync('data.json', JSON.stringify(transformedData, null, 2), 'utf-8');
console.log('Data saved to data.json');
