// Imports
const express = require("express");
const APIRouter = require("./routes/APIRouter");
const PageRouter = require("./routes/PageRouter");
const app = express();
const port = 3000;

// Static Files
app.use(express.static("public"));
app.use("/stylesheets", express.static(__dirname + "public/stylesheets"));
app.use("/scripts", express.static(__dirname + "public/scripts"));
app.use("/img", express.static(__dirname + "public/img"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// ============ Render pages ===============



//Page routes
app.use("/", PageRouter);

// =============== API CALLS ===============

// Middleware to parse JSON data
app.use(express.json());

// API routes
app.use("/api", APIRouter);

// Port
app.listen(port, () => console.log(`Server running on port ${port}`));
