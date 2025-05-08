const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const DATA_DIR = path.join(__dirname, 'resource');
const ORIGINAL_FILE = path.join(DATA_DIR, 'original.json');
const PROCESSED_FILE = path.join(DATA_DIR, 'processed.json');

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/html', express.static(path.join(__dirname, 'html')));

// Ensure resource directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Generate array of 80 random decimal numbers between 1 and 10
function generateArray() {
  const arr = [];
  for (let i = 0; i < 80; i++) {
    arr.push((Math.random() * 9 + 1).toFixed(5)); // 5 decimal places for storage
  }
  return arr.map(Number);
}

// Save array to file as JSON
function saveArrayToFile(filePath, arr) {
  fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');
}

// Read array from file
function readArrayFromFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// Sort array by columns (8 rows x 10 cols)
function sortByColumns(arr, order = 'asc', precision = 2) {
  const rows = 8;
  const cols = 10;
  // Convert to 2D array
  let matrix = [];
  for (let r = 0; r < rows; r++) {
    matrix[r] = arr.slice(r * cols, (r + 1) * cols);
  }
  // Sort each column
  for (let c = 0; c < cols; c++) {
    let col = [];
    for (let r = 0; r < rows; r++) {
      col.push(matrix[r][c]);
    }
    col.sort((a, b) => order === 'asc' ? a - b : b - a);
    for (let r = 0; r < rows; r++) {
      matrix[r][c] = Number(col[r].toFixed(precision));
    }
  }
  // Flatten back to 1D array
  return matrix.flat();
}

// API to get original data
app.get('/data/original', (req, res) => {
  let arr = readArrayFromFile(ORIGINAL_FILE);
  if (!arr) {
    arr = generateArray();
    saveArrayToFile(ORIGINAL_FILE, arr);
    saveArrayToFile(PROCESSED_FILE, arr); // initially processed same as original
  }
  res.json(arr);
});

// API to get sorted data
app.get('/data/sorted', (req, res) => {
  const order = req.query.order === 'desc' ? 'desc' : 'asc';
  const precision = parseInt(req.query.precision);
  let arr = readArrayFromFile(PROCESSED_FILE);
  if (!arr) {
    arr = readArrayFromFile(ORIGINAL_FILE) || generateArray();
  }
  const sorted = sortByColumns(arr, order, isNaN(precision) ? 2 : precision);
  saveArrayToFile(PROCESSED_FILE, sorted);
  res.json(sorted);
});

// Serve index.html as root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
