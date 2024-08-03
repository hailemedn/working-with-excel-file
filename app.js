const xlsx = require('xlsx');
const fs = require('fs');

// Read the Excel file
const workbook = xlsx.readFile('Rent.xlsx');

// Access a specific sheet
const sheetName = 'Sheet1';
const worksheet = workbook.Sheets[sheetName];

// Access specific cells
const cellA4 = worksheet['A5'].v; // Value of cell A1
// const cellB2 = worksheet['B2'].v; // Value of cell B2

console.log(cellA4);