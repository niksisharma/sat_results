const db = require("./db");

// Insert Data
const insertData = (req, res) => {
  const { name, address, city, pincode, country, satScore } = req.body;
  const passed = satScore > 480 ? "Pass" : "Fail";

  const sql =
    "INSERT INTO sat_results (name, address, city, pincode, country, sat_score, passed) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [name, address, city, pincode, country, satScore, passed];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Failed to insert data" });
    } else {
      res.json({ message: "Data inserted successfully" });
    }
  });
};

// View All Data
const viewData = (req, res) => {
  const sql = "SELECT * FROM sat_results";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(result);
    }
  });
};

// Get Rank
const getRank = (req, res) => {
  const name = req.params.name;

  const sql =
    "SELECT name, sat_score, FIND_IN_SET(sat_score, (SELECT GROUP_CONCAT(sat_score ORDER BY sat_score DESC) FROM sat_results)) AS `rank` FROM sat_results WHERE name = ?";
  const values = [name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error getting rank:", err);
      res.status(500).json({ error: "Failed to get rank" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Record not found" });
      } else {
        res.json(result[0]);
      }
    }
  });
};

// Update Score
const updateScore = (req, res) => {
  const name = req.params.name;
  const newSatScore = req.body.newSatScore;
  const passed = newSatScore > 480 ? "Pass" : "Fail";

  const sql = "UPDATE sat_results SET sat_score = ?, passed = ? WHERE name = ?";
  const values = [newSatScore, passed, name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating score:", err);
      res.status(500).json({ error: "Failed to update score" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Record not found" });
      } else {
        res.json({ message: "Score updated successfully" });
      }
    }
  });
};

// Delete Record
const deleteRecord = (req, res) => {
  const name = req.params.name;

  const sql = "DELETE FROM sat_results WHERE name = ?";
  const values = [name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      res.status(500).json({ error: "Failed to delete record" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Record not found" });
      } else {
        res.json({ message: "Record deleted successfully" });
      }
    }
  });
};

module.exports = {
  insertData,
  viewData,
  getRank,
  updateScore,
  deleteRecord,
};
