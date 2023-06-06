const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const Shelly = require("../models/Shelly.class.js");
const creds = require("../config/credentials.js");

// Connect to database
const db = mysql.createConnection(creds.db);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the shelly database");
});

// === API CALLS ===


// ON
router.post("/shellybulb/:id/on", async (req, res, next) => {
  const id = req.params.id;

  const query = "SELECT * FROM shelly WHERE id = ?";
  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error("Error turning on device:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const ip = results[0].ip;
    const username = results[0].username;
    const password = results[0].password;

    const shelly = new Shelly(ip, username, password);

    const result = await shelly.turnOn();
    if (result === true) {
      res.status(204).send();
    } else {
      res.status(500).json("Could not turn on the bulb!");
    }
  });

});

// OFF
router.post("/shellybulb/:id/off", async (req, res, next) => {
  const id = req.params.id;

  const query = "SELECT * FROM shelly WHERE id = ?";

  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error("Error turning off device:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const ip = results[0].ip;
    const username = results[0].username;
    const password = results[0].password;

    const shelly = new Shelly(ip, username, password);

    const result = await shelly.turnOff();
    if (result === true) {
      res.status(204).send();
    } else {
      res.status(500).json("Could not turn off the bulb!");
    }
  });


});

// DELETE

router.delete("/shellybulb/delete/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM shelly WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting device:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send("Device deleted successfully");
  });
});

module.exports = router;
