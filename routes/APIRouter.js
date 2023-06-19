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

// CHANGE COLOR

router.post("/shellybulb/:id/color", async (req, res) => {
  const id = req.params.id;
  const red = req.body.red;
  const green = req.body.green;
  const blue = req.body.blue;
  
  const query = "SELECT * FROM shelly WHERE id = ?";
  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error("Error fetching device:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const ip = results[0].ip;
    const username = results[0].username;
    const password = results[0].password;

    const shelly = new Shelly(ip, username, password);
    shelly.red = red;
    shelly.green = green;
    shelly.blue = blue;

    const result = await shelly.changeColor();
    if (result) {
      res.status(200).json({ message: "Color changed successfully" });
    } else {
      res.status(500).json({ message: "Error changing color" });
    }
  });
});

// GAIN

router.post("/shellybulb/:id/gain", async (req, res) => {
  const id = req.params.id;
  const gain = req.body.gain;
  
  
  const query = "SELECT * FROM shelly WHERE id = ?";
  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error("Error fetching device:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const ip = results[0].ip;
    const username = results[0].username;
    const password = results[0].password;

    const shelly = new Shelly(ip, username, password);
    shelly.gain = gain;

    const result = await shelly.modifyGain();
    if (result) {
      res.status(200).json({ message: "Gain modified successfully" });
    } else {
      res.status(500).json({ message: "Error modifying gain" });
    }
  });
});

// BRIGHTNESS

router.post("/shellybulb/:id/brightness", async (req, res) => {
  const id = req.params.id;
  const brightness = req.body.brightness;
  
  const query = "SELECT * FROM shelly WHERE id = ?";
  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error("Error fetching device:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const ip = results[0].ip;
    const username = results[0].username;
    const password = results[0].password;

    const shelly = new Shelly(ip, username, password);
    shelly.brightness = brightness;

    const result = await shelly.modifyBrightness();
    if (result) {
      res.status(200).json({ message: "Brightness modified successfully" });
    } else {
      res.status(500).json({ message: "Error modifying brightness" });
    }
  });
});


// TEMPERATURE

router.post("/shellybulb/:id/temp", async (req, res) => {
  const id = req.params.id;
  const temp = req.body.temp;

  const query = "SELECT * FROM shelly WHERE id = ?";
  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error("Error fetching device:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const ip = results[0].ip;
    const username = results[0].username;
    const password = results[0].password;

    const shelly = new Shelly(ip, username, password);
    shelly.temp = temp;


    const result = await shelly.modifyTemperature();
    if (result) {
      res.status(200).json({ message: "Temperature modified successfully" });
    } else {
      res.status(500).json({ message: "Error modifying temperature" });
    }
  });
});

module.exports = router;
