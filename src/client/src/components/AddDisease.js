import { useState, useEffect } from "react";
import Axios from "axios";

const AddDisease = () => {
  const [diseaseName, setDiseaseName] = useState("");
  const [DNASequence, setDNASequence] = useState("");
  const [diseasesList, setDiseasesList] = useState([]);

  const diseaseNameChangeHandler = (event) => {
    setDiseaseName(event.target.value);
  };

  const DNASequenceChangeHandler = (event) => {
    setDNASequence(event.target.value);
  };

  const submitDisease = () => {
    Axios.post("http://localhost:3001/api/insert", {
      disease_name: diseaseName,
      dna_sequence: DNASequence,
    }).then(() => {
      alert("Insert Success");
    });
    setDiseaseName("");
    setDNASequence("");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setDiseasesList(response.data);
    });
  });

  const showDiseases = () => {};

  return (
    <div class="App">
      <h1>Add Disease</h1>
      <label>Nama Penyakit:</label>
      <input
        type="text"
        name="disease-name"
        onChange={diseaseNameChangeHandler}
      />
      <label>Sequence DNA:</label>
      <input
        type="text"
        name="dna-sequence"
        onChange={DNASequenceChangeHandler}
      />
      <button>Upload File</button>
      <button type="submit" onClick={submitDisease}>
        Submit
      </button>

      <p>Loaded sql:</p>
      {diseasesList.map((val) => {
        return (
          <div>
            <label>
              ID: {val.id} Disease name: {val.disease_name} DNA Sequence:{" "}
              {val.dna_sequence}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default AddDisease;
