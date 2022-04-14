import { useState } from "react";

const FindResult = (props) => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="App">
            <h1>Find Result</h1>
            <input type="text" name="input-query" placeholder="Search..." onChange={(event) => {setSearchTerm(event.target.value)}}/>
            <p>id, dates, disease, dna_sequence, similarity, isInfected</p>
            {props.items.filter((val) => {
                if (searchTerm == "") {
                    return val
                } else if (val.dates.includes(searchTerm)) {
                    return val
                } else if (val.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).map((val) => {
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
    )
}

export default FindResult;