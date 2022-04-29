import { useState, useEffect, useLayoutEffect } from "react";
import Axios from "axios";
import HasilTes from "./HasilTes";

const TestDNA = ({ diseasesList, testResult, onUpdate, selected }) => {
    const [enteredDisease, setEnteredDisease] = useState("");
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredDNASequence, setEnteredDNASequence] = useState("");
    const [similarity, setSimilarity] = useState(0);
    const [isInfected, setIsInfected] = useState(0);
    const [date, setDate] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [stringMatcher, setStringMatcher] = useState(1);
    const [showTestResult, setShowTestResult] = useState(false);

    const getSimilarity = async () => {
        return await Axios.get(
            "https://dna-tester.herokuapp.com/api/test-result"
        ).then((response) => {
            if (response.data.length !== 0) {
                return [
                    response.data.at(-1).similarity,
                    response.data.at(-1).isinfected,
                ];
            }
        });
    };

    var dt = new Date();
    const datetime =
        dt.getDate().toString().padStart(2, "0") +
        " " +
        dt.toLocaleString("default", { month: "long" }) +
        " " +
        dt.getFullYear().toString().padStart(4, "0");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setFileContent(reader.result);
        };
        reader.onerror = () => {
            console.log("Fail to Upload", reader.error);
        };
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

    const stringMatcherChangeHandler = (event) => {
        setStringMatcher(event.target.value);
    };

    // submit new test result
    const submitTestResult = async (event) => {
        event.preventDefault();
        let inputContent = "";
        if (!selected) {
            inputContent = fileContent;
        } else {
            inputContent = enteredDNASequence
        }
        if (
            enteredUsername === "" ||
            enteredDisease === "" ||
            inputContent === ""
        ) {
            alert("Isi kolom yang masih kosong!");
        } else {
            if (!isValidDNASequence(inputContent)) {
                alert(
                    "Invalid DNA Sequence\nDNA Sequence only contains A, G, C, T"
                );
            } else if (!isExistDisease(enteredDisease)) {
                alert(
                    "Sorry, disease " +
                        enteredDisease +
                        " does not exist in database :("
                );
            } else {
                await Axios.post(
                    "https://dna-tester.herokuapp.com/api/insert-test-result",
                    {
                        dates: datetime,
                        disease: enteredDisease,
                        dna_sequence: inputContent,
                        similarity: similarity,
                        isInfected: isInfected,
                        username: enteredUsername,
                        stringMatcher: stringMatcher,
                    }
                );
                const [newSimilarities, newIsInfected] = await getSimilarity();
                setSimilarity(newSimilarities);
                setIsInfected(newIsInfected);
                onUpdate(
                    datetime,
                    enteredUsername,
                    enteredDisease,
                    inputContent,
                    newSimilarities,
                    newIsInfected
                );
                setShowTestResult(true);
                alert("Insert Success");
            }
        }
		setEnteredDisease("");
        setEnteredUsername("");
        setEnteredDNASequence("");
    };

    // Check if the DNA sequence is valid, only contains A, G, C, T
    var isValidDNASequence = function (dnaSequence) {
        const re = new RegExp(/^[ACGT]+$/);
        return re.test(dnaSequence);
    };

    // Check if the input disease is exist in the database
    const isExistDisease = function (diseaseName) {
        for (let i = 0; i < diseasesList.length; i++) {
            if (diseasesList[i].disease_name === diseaseName) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className="card">
            <h1>Test DNA</h1>
            <form onSubmit={submitTestResult}>
                <label>Nama Pengguna:</label>
                <input
                    type="text"
                    name="username"
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                />
                <label>Sequence DNA Pengguna:</label>
                {selected && <input
                    type="text"
                    name="dna-sequence"
                    value={enteredDNASequence}
                    onChange={DNASequenceChangeHandler}
                />}
                {!selected && <input
                    class="bg-primary rounded-lg text-white text-md w-72"
                    type="file"
                    onChange={handleFileChange}
                ></input>}
                <label>Prediksi Penyakit:</label>
                <input
                    type="text"
                    name="predicted-disease"
                    value={enteredDisease}
                    onChange={diseaseChangeHandler}
                />
                <div onChange={stringMatcherChangeHandler}>
                    <label>Choose String Matching Algorithm:</label> <br />
                    <div className="flex">
                        <input className="w-4" type="radio" name="string-matcher" value="1" />
                        <label className="pt-2">Knuth-Morris-Pratt</label> <br />
                    </div>
                    <div className="flex">
                        <input className="w-4" type="radio" name="string-matcher" value="2" />
                        <label className="pt-2">Boyer-Moore</label>
                    </div>
                </div>
                <button
                    className="bg-tertiary hover:bg-blue-900 my-4 rounded-md w-56 mx-auto h-8"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            <div>
                {!selected && <p>File Content: {fileContent}</p>}
                <p className="text-center">Hasil Tes</p>
                <p className="text-xs text-center">Tanggal - Pengguna - Penyakit - Similarity - Status</p>
            </div>
            {showTestResult && <HasilTes testResult={testResult} />}
        </div>
    );
};

export default TestDNA;
