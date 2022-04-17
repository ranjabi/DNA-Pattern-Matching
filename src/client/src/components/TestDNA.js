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

    var dt = new Date();
    const datetime = (
        dt.getDate().toString().padStart(2, '0') + ' ' +
        dt.toLocaleString('default', { month: 'long' }) + ' ' +
        dt.getFullYear().toString().padStart(4, '0'));

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
                dates: datetime,
                disease: enteredDisease,
                dna_sequence: enteredDNASequence,
                similarity: similarity,
                isInfected: isInfected,
                username: enteredUsername,
            }).then(() => {
                props.onUpdate(datetime, enteredDisease, fileContent, similarity, isInfected, enteredUsername)
                alert("Insert Success");
                setEnteredDisease("");
                setEnteredUsername("");
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
                dates: datetime,
                disease: enteredDisease,
                dna_sequence: fileContent,
                similarity: similarity,
                isInfected: isInfected,
                username: enteredUsername,
            }).then(() => {
                props.onUpdate(datetime, enteredDisease, fileContent, similarity, isInfected, enteredUsername)
                alert("Insert Success");
                setEnteredDisease("");
                setEnteredUsername("");
            });
        } else {
            alert("Invalid DNA Sequence");
        }
    };

    var isValidDNASequence = function(str){
        const re = new RegExp(/^[ACGT]+$/);
        return re.test(str);
    }

    return (
        <div className="card">
            <h1>Test DNA</h1>
            <label>Nama Pengguna:</label>
            <input
                type="text"
                name="username"
                onChange={usernameChangeHandler}
            />
            <label>Sequence DNA Pengguna:</label>
            <input
                type="text"
                name="dna-sequence"
                onChange={DNASequenceChangeHandler}
            />
            <input class="bg-primary rounded-lg text-white text-md w-72" type="file" onChange={handleFileChange}></input>
            <label>Prediksi Penyakit:</label>
            <input
                type="text"
                name="predicted-disease"
                onChange={diseaseChangeHandler}
            />
            <button onClick={submitTestResult}>
                Submit using Input
            </button>
            <button onClick={submitTestResultFromFile}>
                Submit using File Upload
            </button>
            <div>
                <p>File Content: {fileContent}</p>
                <p>Tanggal - Pengguna - Penyakit - Similarity - True/False</p>
                <p>{datetime} - {enteredUsername} - {enteredDisease} - {similarity} - True/False</p>
            </div>
        </div>
    );
};

export default TestDNA;
