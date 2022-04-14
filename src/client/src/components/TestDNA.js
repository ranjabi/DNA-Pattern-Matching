import { useState } from "react";
import Axios from "axios";

const TestDNA = (props) => {
    const [enteredDisease, setEnteredDisease] = useState("");
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredDNASequence, setEnteredDNASequence] = useState("");
    const [similarity, setSimilarity] = useState("89");
    const [isInfected, setIsInfected] = useState(0);
    const [date, setDate] = useState('2022/04/13')
    

    // let dateNow = new Date().toLocaleDateString();
    // const dd = date.getDate();
    // const mm = date.getMonth() + 1;
    // const yyyy = date.getFullYear();
    // date = yyyy + "/" + mm + "/" + dd;

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
        setEnteredDNASequence(event.target.value)
    }

    const submitTestResult = () => {
        Axios.post("http://localhost:3001/api/insert-test-result", {
            dates: date,
            disease: enteredDisease,
            dna_sequence: enteredDNASequence,
            similarity: similarity,
            isInfected: isInfected,
            username: enteredUsername,
        }).then(() => {
            alert("Insert Success");
        });
        setEnteredDisease("");
        setEnteredUsername("");
    };

    return (
        <div class="App">
            <h1>Test DNA</h1>
            <label>Nama Pengguna:</label>
            <input type="text" name="username" onChange={usernameChangeHandler}/>
            <label>Sequence DNA:</label>
            <input type="text" name="dna-sequence" onChange={DNASequenceChangeHandler}/>
            <label>Prediksi Penyakit:</label>
            <input type="text" name="predicted-disease" onChange={diseaseChangeHandler}/>
            <button type="Submit" onClick={submitTestResult}>Submit</button>
            <div>
                <p>Tanggal - Pengguna - Penyakit - Similarity - True/False</p>
            </div>

            <p>Loaded sql:</p>
            <p>id, dates, disease, dna_sequence, similarity, isInfected</p>
            {props.items.map((val) => {
                return (
                    <div style={{ textAlign: "left" }}>
                        <label>
                            {val.id}, {val.dates}, {val.username}, {val.disease}, {val.dna_sequence}, {val.similarity}%,{" "}
                            {val.isInfected}
                        </label>
                    </div>
                );
            })}
        </div>
    );
};

export default TestDNA;
