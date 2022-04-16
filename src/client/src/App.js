import "./App.css";
import AddDisease from "./components/AddDisease";
import TestDNA from "./components/TestDNA";
import FindResult from "./components/FindResult";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
    const [diseasesList, setDiseasesList] = useState([]);
    const [testResult, setTestResult] = useState([]);
    const [showAdvanced, setShowAdvanced] = useState(false);

    useEffect(() => {
        Axios.get("https://dna-tester.herokuapp.com/api/diseases-list").then(
            (response) => {
                setDiseasesList(response.data);
            }
        );
    }, []);

    useEffect(() => {
        Axios.get("https://dna-tester.herokuapp.com/api/test-result").then(
            (response) => {
                setTestResult(response.data);
            }
        );
    }, []);

    const magicButtonHandler = () => {
        if (showAdvanced) {
            setShowAdvanced(false);
        } else {
            setShowAdvanced(true);
        }
    };

    return (
        <div class="bg-primary p-4">
            <div className="bg-primary p-14 flex justify-center">
                <AddDisease items={diseasesList} />
                <TestDNA items={testResult} />
                <FindResult items={testResult} />
            </div>
            <button class="text-white" onClick={magicButtonHandler}>Show Database</button>
            <div className={showAdvanced ? "container" : "Hide"}>
            {/* <div className="container"> */}
                <div class="bg-secondary p-8 rounded-2xl">
                    <p>Loaded sql:</p>
                    <p>id, disease_name, dna_sequence</p>
                    {diseasesList.map((val) => {
                        return (
                            <div style={{ textAlign: "left" }}>
                                <label>
                                    {val.id}, {val.disease_name},{" "}
                                    {val.dna_sequence}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div class="bg-secondary p-8 rounded-2xl mx-4">
                    <p>Loaded sql:</p>
                    <p>
                        id, dates, disease, dna_sequence, similarity, isInfected
                    </p>
                    {testResult.map((val) => {
                        return (
                            <div style={{ textAlign: "left" }}>
                                <label>
                                    {val.id}, {val.dates}, {val.username},{" "}
                                    {val.disease}, {val.dna_sequence},{" "}
                                    {val.similarity}%, {val.isInfected}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
