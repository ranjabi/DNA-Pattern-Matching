import { useState } from "react";
import Axios from "axios";
import { reader } from "react-dom";

const AddDisease = (props) => {
    const [diseaseName, setDiseaseName] = useState("");
    const [DNASequence, setDNASequence] = useState("");
    const [fileContent, setFileContent] = useState("");

    const diseaseNameChangeHandler = (event) => {
        setDiseaseName(event.target.value);
    };

    const DNASequenceChangeHandler = (event) => {
        setDNASequence(event.target.value);
    };

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

    const submitDisease = () => {
        if (isValidDNASequence(DNASequence)) {
            Axios.post(
                "https://dna-tester.herokuapp.com/api/insert-diseases-list",
                {
                    disease_name: diseaseName,
                    dna_sequence: DNASequence,
                }
            ).then(() => {
                alert("Insert Success");
            });
        } else {
            alert("Invalid DNA Sequence");
        }

        setDiseaseName("");
        setDNASequence("");
    };

    const submitDiseaseFromFile = () => {
        if (isValidDNASequence(DNASequence)) {
            Axios.post(
                "https://dna-tester.herokuapp.com/api/insert-diseases-list",
                {
                    disease_name: diseaseName,
                    dna_sequence: fileContent,
                }
            ).then(() => {
                alert("Insert Success");
            });
        } else {
            alert("Invalid DNA Sequence");
        }
        
        setDiseaseName("");
        setDNASequence("");
    };

    var isValidDNASequence = function(str){
        const re = new RegExp(/^[ACGT]+$/);
        console.log(re.test(str));
        return re.test(str);
    }

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
            <input
                type="file" onChange={handleFileChange}
            />
            <button type="submit" onClick={submitDisease}>
                Submit using Input
            </button>
            <button type="submit" onClick={submitDiseaseFromFile}>
                Submit using File Upload
            </button>
            <p>File Content: {fileContent}</p>
        </div>
    );
};

export default AddDisease;
