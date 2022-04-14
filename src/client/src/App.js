import "./App.css";
import AddDisease from "./components/AddDisease";
import TestDNA from "./components/TestDNA";
import FindResult from "./components/FindResult";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
    const [diseasesList, setDiseasesList] = useState([]);
    const [testResult, setTestResult] = useState([]);

    useEffect(() => {
        Axios.get("https://dna-tester.herokuapp.com/api/diseases-list").then(
            (response) => {
                setDiseasesList(response.data);
            }
        );
    });

    useEffect(() => {
        Axios.get("https://dna-tester.herokuapp.com/api/test-result").then(
            (response) => {
                setTestResult(response.data);
            }
        );
    });

    return (
        <div>
            <div className="Container">
                <AddDisease items={diseasesList} />
                <TestDNA items={testResult} />
                <FindResult items={testResult} />
            </div>
            <div className="Container">
                <div className="Container Column Margin">
                    <label>SQL Query:</label>
                    <input type="text" size="100" />
                    <button type="submit">Execute</button>
                </div>
                <div className="Margin">
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
                <div className="Margin">
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
