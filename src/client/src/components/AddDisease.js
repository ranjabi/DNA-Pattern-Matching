import { useState } from "react";
import Axios from "axios";
import { reader } from "react-dom";

const AddDisease = ({ selected, diseasesList, onUpdate }) => {
    const [diseaseName, setDiseaseName] = useState("");
    const [DNASequence, setDNASequence] = useState("");
    const [fileContent, setFileContent] = useState("");

    const diseaseNameChangeHandler = (event) => {
        setDiseaseName(event.target.value);
    };

    const DNASequenceChangeHandler = (event) => {
        setDNASequence(event.target.value);
    };

    const isExistDisease = function (diseaseName) {
        for (let i = 0; i < diseasesList.length; i++) {
            if (diseasesList[i].disease_name === diseaseName) {
                return true;
            }
        }
        return false;
    };

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

    const submitDisease = (event) => {
        event.preventDefault();
        let inputContent = "";
        if (!selected) {
            inputContent = fileContent;
        } else {
            inputContent = DNASequence
        }
        console.log("file content: " + inputContent)
        if (diseaseName === "" || inputContent == "") {
            alert("Nama penyakit atau baris DNA tidak boleh kosong!");
        } else {
            if (isExistDisease(diseaseName)) {
                alert("Penyakit dengan nama yang sama sudah ada");
            } else {
                if (isValidDNASequence(inputContent)) {
                    Axios.post(
                        "http://localhost:3001/api/insert-diseases-list",
                        {
                            disease_name: diseaseName,
                            dna_sequence: inputContent,
                        }
                    ).then(() => {
                        onUpdate(diseaseName, inputContent);
                        alert("Insert Success");
                    });
                } else {
                    alert(
                        "Invalid DNA Sequence\nDNA Sequence only contains A, G, C, T"
                    );
                }
            }
        }
        setDiseaseName("");
        setDNASequence("");
    };

    var isValidDNASequence = function (str) {
        const re = new RegExp(/^[ACGT]+$/);
        console.log(re.test(str));
        return re.test(str);
    };

    return (
        <div className="card">
            <h1>Add Disease</h1>
            <form onSubmit={submitDisease}>
                <label>Nama Penyakit:</label>
                <input
                    type="text"
                    name="disease-name"
                    value={diseaseName}
                    onChange={diseaseNameChangeHandler}
                />
                <label>Sequence DNA:</label>
                {selected && (
                <input
                    type="text"
                    name="dna-sequence"
                    value={DNASequence}
                    onChange={DNASequenceChangeHandler}
                />)}
                {!selected && (<input
                    class="bg-primary rounded-lg text-white text-md w-72"
                    type="file"
                    onChange={handleFileChange}
                />)}
                
                <button
                    className="bg-tertiary hover:bg-blue-900 my-4 rounded-md w-56 mx-auto h-8"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            {!selected && <p>File Content: {fileContent}</p>}
        </div>
    );
};

export default AddDisease;
