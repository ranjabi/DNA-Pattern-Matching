const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { application } = require("express");
const app = express();
var sm = require('./stringMatching');
var lcs = require('./LCSAlgorithm')
var search = require('./regexSearch');

const Pool = require("pg").Pool;

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
});

const PORT = 3001;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
 }
 
app.use(cors(coursOptions))

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

async function getDiseaseDNASequence(disease_name) {
    const result = await pool.query(
        "SELECT dna_sequence FROM diseases WHERE disease_name = $1", [disease_name]
    );
    return result.rows[0]["dna_sequence"];
}

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

const insertTestResult = async (req, res) => {
    const dates = req.body.dates;
    const disease = req.body.disease;
    const dna_sequence = req.body.dna_sequence;
    const username = req.body.username;

    const disease_sequence = await getDiseaseDNASequence(disease);
    console.log("-------- disease dna sequence: " + disease_sequence);

    const stringMatcher = req.body.stringMatcher;
    console.log("-------- stringMatcher: " + stringMatcher);
    const isInfected = sm.isInfected(dna_sequence, disease_sequence, stringMatcher);
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

const searchTestResult = (req, res) => {
    const searchTerm = req.query.searchTerm;
    const {dateSearch, nameSearch, searchMethod} = search.regexSearchTerm(searchTerm);
    if (searchMethod === 1) {
        pool.query(
            "SELECT * FROM test_result WHERE dates = $1", [dateSearch],
            (err, result) => {
                if (err) {
                    throw err;
                }
                res.status(200).json(result.rows);
            }
        );
    } else if (searchMethod === 2) {
        pool.query(
            "SELECT * FROM test_result WHERE dates = $1 AND disease LIKE $2", [dateSearch, nameSearch+'%'],
            (err, result) => {
                if (err) {
                    throw err;
                }
                res.status(200).json(result.rows);
            }
        );
    } else if (searchMethod === 3) {
        pool.query(
            "SELECT * FROM test_result WHERE disease LIKE $1", [nameSearch+'%'],
            (err, result) => {
                if (err) {
                    throw err;
                }
                res.status(200).json(result.rows);
            }
        );
    }
}

app.get("/api/diseases-list", getDiseasesList);
app.post("/api/insert-diseases-list", insertDiseasesList);
app.get("/api/test-result", getTestResult);
app.post("/api/insert-test-result", insertTestResult);
app.get("/", (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
});
app.get("/api/search-test-result", searchTestResult);

app.listen(process.env.PORT || PORT, () => {
    console.log("Server is connected");
});
