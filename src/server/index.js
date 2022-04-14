const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const PORT = 3001;

const db = mysql.createPool({
  // configure user and password using your profile
  host: "remotemysql.com",
  user: "1dWSdg0tkb",
  password: "v1x6OUsqMG",
  database: "1dWSdg0tkb",
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

app.get("/api/diseases-list", (req, res) => {
  const sqlShowDisease = "SELECT * FROM diseases;";
  db.query(sqlShowDisease, (err, result) => {
    // console.log(result)
    res.send(result);
  });
});

app.post("/api/insert-diseases-list", (req, res) => {
  const disease_name = req.body.disease_name;
  const dna_sequence = req.body.dna_sequence;
  
  const sqlInsertDisease =
  "INSERT INTO diseases (disease_name, dna_sequence) VALUES (?, ?);";
  db.query(sqlInsertDisease, [disease_name, dna_sequence], (err, result) => {
    console.log(result);
  });
});

app.get("/api/test-result", (req, res) => {
  const sqlShowTestResult = "SELECT * FROM test_result;";
  db.query(sqlShowTestResult, (err, result) => {
    // console.log(result)
    res.send(result);
  });
});

app.post("/api/insert-test-result", (req, res) => {
  const dates = req.body.dates;
  const disease = req.body.disease;
  const dna_sequence = req.body.dna_sequence;
  const similarity = req.body.similarity;
  const isInfected = req.body.isInfected;
  const username = req.body.username;

  const sqlInsertTestResult =
    "INSERT INTO test_result (dates, username, disease, dna_sequence, similarity, isInfected) VALUES (?, ?, ?, ?, ?, ?);";
  db.query(sqlInsertTestResult, [dates, username, disease, dna_sequence, similarity, isInfected], (err, result) => {
    console.log(result);
  });
});

app.get("/", (req, res) => {
  res.sendFile("./index.html", {root: __dirname });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server is connected");
});
