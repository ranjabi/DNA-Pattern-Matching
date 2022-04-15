import { useState } from "react";
import Axios from "axios";

const TestDNA = (props) => {
    const [enteredDisease, setEnteredDisease] = useState("");
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredDNASequence, setEnteredDNASequence] = useState("");
    const [similarity, setSimilarity] = useState("89");
    const [isInfected, setIsInfected] = useState(0);
    const [date, setDate] = useState("2022/04/13");
    const [fileContent, setFileContent] = useState("");

    // let dateNow = new Date().toLocaleDateString();
    // const dd = date.getDate();
    // const mm = date.getMonth() + 1;
    // const yyyy = date.getFullYear();
    // date = yyyy + "/" + mm + "/" + dd;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setFileContent(reader.result);
        };
        reader.onerror = () => {
          console.log("Fail to Upload", reader.error)
        }
    };

    const diseaseChangeHandler = (event) => {
        setEnteredDisease(event.target.value);
    };

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const similarityChangeHandler = (event) => {
        setSimilarity(event.target.value);
    };

    const isInfectedChangeHandler = (event) => {
        setIsInfected(event.target.value);
    };

    const DNASequenceChangeHandler = (event) => {
        setEnteredDNASequence(event.target.value);
    };

    const submitTestResult = () => {
        if (isValidDNASequence(enteredDNASequence)) {
            Axios.post("https://dna-tester.herokuapp.com/api/insert-test-result", {
                dates: date,
                disease: enteredDisease,
                dna_sequence: enteredDNASequence,
                similarity: similarity,
                isInfected: isInfected,
                username: enteredUsername,
            }).then(() => {
                alert("Insert Success");
            });
        } else {
            alert("Invalid DNA Sequence");
        }
        setEnteredDisease("");
        setEnteredUsername("");
    };

    const submitTestResultFromFile = () => {
        if (isValidDNASequence(enteredDNASequence)) {
            Axios.post("https://dna-tester.herokuapp.com/api/insert-test-result", {
                dates: date,
                disease: enteredDisease,
                dna_sequence: fileContent,
                similarity: similarity,
                isInfected: isInfected,
                username: enteredUsername,
            }).then(() => {
                alert("Insert Success");
            });
        } else {
            alert("Invalid DNA Sequence");
        }
        setEnteredDisease("");
        setEnteredUsername("");
    };

    var isValidDNASequence = function(str){
        const re = new RegExp(/^[ACGT]+$/);
        return re.test(str);
    }

    return (
        <div class="App">
            <h1>Test DNA</h1>
            <label>Nama Pengguna:</label>
            <input
                type="text"
                name="username"
                onChange={usernameChangeHandler}
            />
            <label>Sequence DNA:</label>
            <input
                type="text"
                name="dna-sequence"
                onChange={DNASequenceChangeHandler}
            />
            <input type="file" onChange={handleFileChange}></input>
            <label>Prediksi Penyakit:</label>
            <input
                type="text"
                name="predicted-disease"
                onChange={diseaseChangeHandler}
            />
            <button type="Submit" onClick={submitTestResult}>
                Submit using Input
            </button>
            <button type="Submit" onClick={submitTestResultFromFile}>
                Submit using File Upload
            </button>
            <div>
                <p>File Content: {fileContent}</p>
                <p>Tanggal - Pengguna - Penyakit - Similarity - True/False</p>
            </div>
        </div>
    );
};

export default TestDNA;
