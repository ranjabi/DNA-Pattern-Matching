const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { application } = require("express");
const app = express();
var sm = require('./stringMatching');
var lcs = require('./LCSAlgorithm')

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "bzflpdkajwjyui",
    host: "ec2-44-194-4-127.compute-1.amazonaws.com",
    database: "d85gcsh9u91r2i",
    password:
        "40aab3d40cad2bc7b13bb36f2a68ccc833c6534f6460cce7cffb14eadae29bf0",
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
});

const PORT = 3001;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/favicon.ico", (req, res) => {
    res.sendStatus(204);
});

const getDiseasesList = (req, res) => {
    pool.query("SELECT * FROM diseases", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
};

const getDiseaseDNASequence = (req, res) => {
    disease_name = "strestubes";
    pool.query(
        "SELECT dna_sequence FROM diseases WHERE disease_name = $1", [disease_name], (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result.rows);
    });
};

const insertDiseasesList = (req, res) => {
    const disease_name = req.body.disease_name;
    const dna_sequence = req.body.dna_sequence;
    pool.query(
        "INSERT INTO diseases (disease_name, dna_sequence) VALUES ($1, $2)",
        [disease_name, dna_sequence],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result.rows);
        }
    );
};

const getTestResult = (req, res) => {
    pool.query("SELECT * FROM test_result", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
};

const insertTestResult = (req, res) => {
    const dates = req.body.dates;
    const disease = req.body.disease;
    const dna_sequence = req.body.dna_sequence;
    const username = req.body.username;

    // const disease_sequence = getDiseaseDNASequence(disease);
    // dummy test: diesease strestubes, dna "ACC"
    const disease_sequence = "ACC";
    const isInfected = sm.isInfected(dna_sequence, disease_sequence);
    console.log(disease_sequence);
    console.log(isInfected);

    const similarity = lcs.rateLCS(dna_sequence, disease_sequence);
    console.log(similarity);

    console.log(isInfected);

    pool.query(
        "INSERT INTO test_result (dates, username, disease, dna_sequence, similarity, isInfected) VALUES ($1, $2, $3, $4, $5, $6)",
        [dates, username, disease, dna_sequence, similarity, isInfected],
        (err, result) => {
            if (err) {
                throw err;
            }
            console.log(res)
            res.status(200).json(result.rows);
        }
    );
};

app.get("/api/diseases-list", getDiseasesList);
app.post("/api/insert-diseases-list", insertDiseasesList);
app.get("/api/test-result", getTestResult);
app.post("/api/insert-test-result", insertTestResult);
app.get("/api/diseases-dna-sequence", getDiseaseDNASequence);

app.get("/", (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
});

app.listen(process.env.PORT || PORT, () => {
    console.log("Server is connected");
});
