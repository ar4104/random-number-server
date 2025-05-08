
Built by https://www.blackbox.ai

---

# Random Number Server

## Project Overview
Random Number Server is a simple Express.js application that generates an array of 80 random decimal numbers between 1 and 10. This server provides APIs to fetch both the original and processed (sorted) arrays in JSON format. The processed array can be sorted in ascending or descending order based on user preferences. The application is designed to serve a web interface and handle JSON data efficiently.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/random-number-server.git
   cd random-number-server
   ```

2. **Install the dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the server:**
   Start the server using the following command:
   ```bash
   node server.js
   ```
   The server will be running at `http://localhost:3000`.

## Usage
Once the server is running, you can access the following endpoints:

- **Get Original Data:**
  - **Endpoint:** `GET /data/original`
  - **Description:** Fetches the original unprocessed array of random numbers. If the array doesn't exist, it will be generated and stored.

- **Get Sorted Data:**
  - **Endpoint:** `GET /data/sorted`
  - **Parameters:**
    - `order` (optional): The order in which to sort the data. Accepts `asc` or `desc` (default is `asc`).
    - `precision` (optional): Number of decimal places to retain in the sorted output (default is 2).
  - **Description:** Fetches the processed and sorted array. The sorted array is stored for future requests.

- **Web Interface:**
  - **Endpoint:** `GET /`
  - **Description:** Serves the `index.html` file which can be used to display or interact with the random number data.

## Features
- Generates an array of 80 random decimal numbers.
- Provides APIs to retrieve the original and sorted data.
- Allows sorting of the data in ascending or descending order with customizable precision.
- Static files can be served for styling and JavaScript functionalities.
- Automatically creates the required resource directory if it doesn't exist.

## Dependencies
The project uses the following dependencies as specified in `package.json`:
- `express`: A fast, unopinionated, minimalist web framework for Node.js.

## Project Structure
The project directory has the following structure:
```
random-number-server/
│
├── css/                  # Directory for CSS files
├── html/                 # Directory for HTML files
│   └── index.html        # Main HTML file served at the root
├── js/                   # Directory for JavaScript files
├── resource/             # Directory for storing JSON data files
│   ├── original.json     # Stores the original random numbers
│   └── processed.json    # Stores the sorted random numbers
├── server.js             # Main server file where the application logic resides
└── package.json          # Project metadata and dependencies
```

---

Feel free to reach out to the project maintainer for any questions or contributions!