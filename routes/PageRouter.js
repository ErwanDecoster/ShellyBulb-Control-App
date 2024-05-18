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

// Middleware to parse JSON data
router.use(express.urlencoded({ extended: true }));

// === Render pages ===

// Index page
router.get("/", async (req, res) => {
  const query = "SELECT * FROM shelly";
  db.query(query, async (err, results) => {
    if (err) {
      console.error("Error fetching devices:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const shellys = [];
    await Promise.all(results.map(async shelly => {
      const shellyInstance = new Shelly(shelly.ip, shelly.username, shelly.password, shelly.id);
      await shellyInstance.connect();
      shellys.push(shellyInstance);
    }));
    res.render("pages/index", { shellys: shellys });
  });
});

// Adding new device page

router.post("/devices", (req, res) => {
  const ip = req.body.ip;
  const username = req.body.username;
  const password = req.body.password;
  if (!req.body.ip || !req.body.username || !req.body.password) {
    res.status(400).send("All fields are required");
    return;
  } else {
    const query =
      "INSERT INTO shelly (ip, username, password) VALUES (?, ?, ?)";
    db.query(query, [ip, username, password], (err, result) => {
      if (err) {
        console.error("Error creating device:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.redirect("/");
    });
  }
});

// Shellybulb parameters page render + connecting route

router.get("/shellybulb/:id", async (req, res) => {
  const id = req.params.id;

  const query = "SELECT * FROM shelly WHERE id=?";
  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error("Error fetching devices:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const ip = results[0].ip;
    const username = results[0].username;
    const password = results[0].password;
    const shelly = new Shelly(ip, username, password, id);
    await shelly.connect();
    console.log(`Connected to the Shelly #${id}`);
    res.render("pages/shellybulb", { shelly });
  });
});

module.exports = router;
