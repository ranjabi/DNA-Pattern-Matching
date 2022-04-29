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



const pool = (() => {
    if (typeof connectionString === 'undefined') {
        return new Pool({
            connectionString: 'postgres://bzflpdkajwjyui:40aab3d40cad2bc7b13bb36f2a68ccc833c6534f6460cce7cffb14eadae29bf0@ec2-44-194-4-127.compute-1.amazonaws.com:5432/d85gcsh9u91r2i',
            ssl: {
                rejectUnauthorized: false
              }
        });
    } else {
        return new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
              }
        });
} })();

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
 
app.use(cors(corsOptions))

app.get("/favicon.ico", (req, res) => {
    res.sendStatus(204);
});

// function to get all the diseases and their dna sequences from the database
const getDiseasesList = (req, res) => {
    pool.query("SELECT * FROM diseases", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
};

// function to get the dna sequence of a disease
async function getDiseaseDNASequence(disease_name) {
    const result = await pool.query(
        "SELECT dna_sequence FROM diseases WHERE disease_name = $1", [disease_name]
    );
    return result.rows[0]["dna_sequence"];
}

// function to insert new disease into the database
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

// function to get all the test results from the database
const getTestResult = (req, res) => {
    pool.query("SELECT * FROM test_result", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
};

// function to insert new test result into the database
const insertTestResult = async (req, res) => {
    const dates = req.body.dates;
    const disease = req.body.disease;
    const dna_sequence = req.body.dna_sequence;
    const username = req.body.username;

    const disease_sequence = await getDiseaseDNASequence(disease);
    console.log("-------- disease dna sequence: " + disease_sequence);

    const stringMatcher = req.body.stringMatcher;
    console.log("-------- stringMatcher: " + stringMatcher);
    
    var isInfected = sm.isInfected(dna_sequence, disease_sequence, stringMatcher);
    var similarity;
    // Exact Matching
    if (isInfected) {
        isInfected = 1;
        similarity = 1;
    // Similarity Test
    } else {
        similarity = lcs.rateLCS(text, pattern);
        isInfected = similarity >= 0.8 ? 1 : 0;
    }

    console.log(isInfected);
    console.log(similarity);

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

// function to search test results based on search term
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


// API config
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
