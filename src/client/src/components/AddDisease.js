import { useState  } from "react";
import Axios from "axios";

const AddDisease = (props) => {
  const [diseaseName, setDiseaseName] = useState("");
  const [DNASequence, setDNASequence] = useState("");

  const diseaseNameChangeHandler = (event) => {
    setDiseaseName(event.target.value);
  };

  const DNASequenceChangeHandler = (event) => {
    setDNASequence(event.target.value);
  };

  const submitDisease = () => {
    Axios.post("http://localhost:3001/api/insert-diseases-list", {
      disease_name: diseaseName,
      dna_sequence: DNASequence,
    }).then(() => {
      alert("Insert Success");
    });
    setDiseaseName("");
    setDNASequence("");
  };

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


    </div>
  );
};

export default AddDisease;
