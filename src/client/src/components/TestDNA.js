import { useState, useEffect, useLayoutEffect } from "react";
import Axios from "axios";

const TestDNA = (props) => {
    const [enteredDisease, setEnteredDisease] = useState("");
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredDNASequence, setEnteredDNASequence] = useState("");
    const [similarity, setSimilarity] = useState(0);
    const [isInfected, setIsInfected] = useState(0);
    const [date, setDate] = useState("");
    const [fileContent, setFileContent] = useState("");

    const getSimilarity = async () => {
        return await Axios.get("https://dna-tester.herokuapp.com/api/test-result").then(
          (response) => {
              if (response.data.length !== 0) {
                  return response.data.at(-1).similarity;
              }
          }
        );
      }

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

    const DNASequenceChangeHandler = (event) => {
        setEnteredDNASequence(event.target.value);
    };

    const submitTestResult = async () => {
        if (isValidDNASequence(enteredDNASequence)) {
            await Axios.post("https://dna-tester.herokuapp.com/api/insert-test-result", {
                dates: datetime,
                disease: enteredDisease,
                dna_sequence: enteredDNASequence,
                similarity: similarity,
                isInfected: isInfected,
                username: enteredUsername,
            });
            let similarities = await getSimilarity()
            console.log("similarities " + similarities)
            props.onUpdate(datetime, enteredUsername, enteredDisease, enteredDNASequence, similarities, isInfected)
            alert("Insert Success");
            setEnteredDisease("");
            setEnteredUsername("");
        } else {
            alert("Invalid DNA Sequence");
        }
        setEnteredDisease("");
        setEnteredUsername("");
    };

    const submitTestResultFromFile = () => {
        if (isValidDNASequence(enteredDNASequence)) {
            console.log("jalan 1")
            Axios.post("https://dna-tester.herokuapp.com/api/insert-test-result", {
                dates: datetime,
                disease: enteredDisease,
                dna_sequence: fileContent,
                similarity: similarity,
                isInfected: isInfected,
                username: enteredUsername,
            }).then(() => {
                props.onUpdate(datetime, enteredUsername, enteredDisease, fileContent, similarity, isInfected)
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
                <p>{datetime} - {enteredUsername} - {enteredDisease} - {similarity} - {isInfected}</p>
            </div>
        </div>
    );
};

export default TestDNA;
