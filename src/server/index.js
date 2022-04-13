const express = require("Express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  // configure user and password using your profile
  host: "localhost",
  user: "root",
  password: "123456",
  database: "dna",
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api/get", (req, res) => {
  const sqlShowDisease = "SELECT * FROM diseases;";
  db.query(sqlShowDisease, (err, result) => {
    // console.log(result)
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const disease_name = req.body.disease_name;
  const dna_sequence = req.body.dna_sequence;

  const sqlInsertDisease =
    "INSERT INTO diseases (disease_name, dna_sequence) VALUES (?, ?);";
  db.query(sqlInsertDisease, [disease_name, dna_sequence], (err, result) => {
    console.log(result);
  });
});

app.get("/", (req, res) => {
  res.send("Selamat datang di Dufan!");
});

app.listen(3001, () => {
  console.log("Server is connected");
});
