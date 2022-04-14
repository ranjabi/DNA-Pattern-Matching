import './App.css';
import AddDisease from './components/AddDisease';
import TestDNA from './components/TestDNA';
import FindResult from './components/FindResult';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [diseasesList, setDiseasesList] = useState([]);
  const [testResult, setTestResult] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/diseases-list").then((response) => {
      setDiseasesList(response.data);
    });
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/api/test-result").then((response) => {
      setTestResult(response.data);
    });
  });

  return (
    <div className="Container">
      <AddDisease items={diseasesList}/>
      <TestDNA items={testResult}/>
      <FindResult items={testResult}/>
    </div>
  );
}

export default App;
