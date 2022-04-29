import { useState, useEffect } from "react";
import Axios from "axios";

const FindResult = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if (searchTerm.length > 0) {
            Axios.get("https://dna-tester.herokuapp.com/api/search-test-result", {
                params: {
                    searchTerm: searchTerm
                }
            }).then((response) => {
                console.log(response.data);
                setSearchResult(response.data);
            });
        }
      }, [searchTerm]);

    const searchTermChangeHandler = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className="card">
            <h1>Find Result</h1>
            <input type="text" name="input-query" placeholder="Search..." onChange={searchTermChangeHandler}/>
            <p>id. dates - name - disease - similarity - isInfected</p>
            
            {searchResult.map((val) => {
                return (
                    <div style={{ textAlign: "left" }}>
                        <label>
                            {val.id}. {val.dates} - {val.username} - {val.disease} - {val.similarity * 100}% - {val.isInfected === 1 ? 'True' : 'False'}
                        </label>
                    </div>
                );
            })}
        </div>
    )
}

export default FindResult;