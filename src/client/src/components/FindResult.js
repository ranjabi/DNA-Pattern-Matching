import { useState } from "react";

const FindResult = (props) => {
    const [searchTerm, setSearchTerm] = useState('')

    const searchTermChangeHandler = (event) => {
        setSearchTerm(event.target.value);
        if (searchTerm.length > 0) {
            searchPrediction();
        }
    }

    var searchPrediction = function() {
        console.log(searchTerm);
        var res = isValidSearchTerm(searchTerm);
        console.log(res);
        if (res === 0) {
            console.log("Invalid Search Term");
        } else {
            console.log("valid");
        }
    }

    var isValidSearchTerm = function(str) {
        // dd/mm/yyyy or dd-mm-yyyy
        const reTgl1 = new RegExp(/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}$/); 
        // dd month yyyy
        const reTgl2 = new RegExp(/^\d{1,2}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s(\d{4})$/) 
        // dd/mm/yyyy namaPenyakit or dd-mm-yyyy namaPenyakit
        const reTglNama1 = new RegExp(/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}\s[A-Za-z]+$/) 
        // dd month yyyy namaPenyakit
        const reTglNama2 = new RegExp(/^\d{1,2}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s(\d{4})\s[A-Za-z]+$/) 
        // namaPenyakit
        const reNama = new RegExp(/^[A-Za-z]+$/) 
        /* 0 : invalid
           1 : valid, input tanggal
           2 : valid, input tanggal namaPenyakit
           3 : valid, input namaPenyakit */
        if (reTgl1.test(str) || reTgl2.test(str)) {
            return 1;
        } else if (reTglNama1.test(str) || reTglNama2.test(str)) {
            return 2;
        } else if (reNama.test(str)) {
            return 3;
        } else {
            return 0;
        }
    }

    return (
        <div className="card">
            <h1>Find Result</h1>
            <input type="text" name="input-query" placeholder="Search..." onChange={searchTermChangeHandler}/>
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