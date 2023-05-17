const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sat_results",
});

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL database. Error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

module.exports = connection;
