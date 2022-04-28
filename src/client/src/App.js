import "./App.css";
import AddDisease from "./components/AddDisease";
import TestDNA from "./components/TestDNA";
import FindResult from "./components/FindResult";
import MagicButton from "./components/MagicButton";
import Navbar from "./components/Navbar"
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [diseasesList, setDiseasesList] = useState([]);
  const [testResult, setTestResult] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    console.log("diseases list use effect run");
    Axios.get("https://dna-tester.herokuapp.com/api/diseases-list").then(
      (response) => {
        setDiseasesList(response.data);
      }
    );
  }, []);

  useEffect(() => {
    console.log("test result use effect run");
    Axios.get("https://dna-tester.herokuapp.com/api/test-result").then(
      (response) => {
        setTestResult(response.data);
      }
    );
  }, []);

  const selectedHandler = (val) => {
    setSelected(val)
  }

  const updateDiseasesList = (diseaseName, DNASequence) => {
    if (diseasesList.length === 0) {
      setDiseasesList([
        {
          id: 1,
          disease_name: diseaseName,
          dna_sequence: DNASequence,
        },
      ]);
    } else {
      setDiseasesList([
        ...diseasesList,
        {
          id: diseasesList.at(-1).id + 1,
          disease_name: diseaseName,
          dna_sequence: DNASequence,
        },
      ]);
    }
  };

  const updateTestResult = (
    _dates,
    _username,
    _disease,
    _dna_sequence,
    _similarity,
    _isInfected
  ) => {
    if (testResult.length === 0) {
      setTestResult([
        {
          id: 1,
          dates: _dates,
          username: _username,
          disease: _disease,
          dna_sequence: _dna_sequence,
          similarity: _similarity,
          isinfected: _isInfected,
        },
      ]);
    } else {
      setTestResult([
        ...testResult,
        {
          id: testResult.at(-1).id + 1,
          dates: _dates,
          username: _username,
          disease: _disease,
          dna_sequence: _dna_sequence,
          similarity: _similarity,
          isinfected: _isInfected,
        },
      ]);
    }
  };

  return (
    <div class="bg-primary h-screen">
      <Navbar selected={selected} selectedHandler={selectedHandler}/>
      <div class="p-14 flex justify-center">
        <AddDisease diseasesList={diseasesList} onUpdate={updateDiseasesList} selected={selected} />
        <TestDNA diseasesList={diseasesList} testResult={testResult} onUpdate={updateTestResult} selected={selected} />
        <FindResult items={testResult} />
      </div>
      <MagicButton diseasesList={diseasesList} testResult={testResult} />
    </div>
  );
}

export default App;
