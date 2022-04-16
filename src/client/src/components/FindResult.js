import { useState } from "react";

const FindResult = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchMethod, setSearchMethod] = useState(0);
    const [dateSearch, setDateSearch] = useState("");
    const [nameSearch, setNameSearch] = useState("");

    const searchTermChangeHandler = (event) => {
        setSearchTerm(event.target.value);
        if (searchTerm.length > 0) {
            setSearchMethod(isValidSearchTerm(searchTerm));
            console.log(searchTerm);
            console.log(searchMethod);
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
            if (reTgl1.test(str)) {
                setDateSearch(str.replace(/\//g, "-"));
            } else {
                var date = str.split(/\s/);
                date[1] = convertMonth(date[1]);
                setDateSearch(date.join("-"));
            }
            console.log("date " + dateSearch);
            return 1;
        } else if (reTglNama1.test(str) || reTglNama2.test(str)) {
            if (reTglNama1.test(str)) {
                var elmt = str.split(/\s/);
                setDateSearch(elmt[0].replace(/\//g, "-"));
                setNameSearch(elmt[1]);
            } else {
                var elmt = str.split(/\s/);
                elmt[1] = convertMonth(elmt[1]);
                setDateSearch(elmt.slice(0,3).join("-"));
                setNameSearch(elmt[3]);
            }
            console.log("date " + dateSearch);
            console.log("name " + nameSearch);
            return 2;
        } else if (reNama.test(str)) {
            setNameSearch(str);
            console.log("name " + nameSearch);
            return 3;
        } else {
            return 0;
        }
    }

    var convertMonth = function(month) {
        if (month.match(/(j|J)an(?:uary)?/)) {
            return "01";
        } else if (month.match(/(f|F)eb(?:ruary)?/)) {
            return "02";
        } else if (month.match(/(m|M)ar(?:ch)?/)) {
            return "03";
        } else if (month.match(/(a|A)pr(?:il)?/)) {
            return "04";
        } else if (month.match(/(May|may)/)) {    
            return "05";
        } else if (month.match(/(j|J)un(?:e)?/)) {
            return "06";
        } else if (month.match(/(j|J)ul(?:y)?/)) {
            return "07";
        } else if (month.match(/(a|A)ug(?:ust)?/)) {
            return "08";
        } else if (month.match(/(s|S)ep(?:tember)?/)) {
            return "09";
        } else if (month.match(/(o|O)ct(?:ober)?/)) {
            return "10";
        } else if (month.match(/(n|N)ov(?:ember)?/)) {
            return "11";
        } else if (month.match(/(d|D)ec(?:ember)?/)) {
            return "12";
        }
    }

    var searchPrediction = function(val) {
        if (searchMethod === 1) {
            return val.dates.includes(dateSearch)
        } else if (searchMethod === 2) {
            return val.dates.includes(dateSearch) && val.disease.toLowerCase().includes(nameSearch.toLowerCase())
        } else if (searchMethod === 3) {
            return val.disease.toLowerCase().includes(nameSearch.toLowerCase())
        }
    }

    return (
        <div className="card">
            <h1>Find Result</h1>
            <input type="text" name="input-query" placeholder="Search..." onChange={searchTermChangeHandler}/>
            <p>id, dates, disease, dna_sequence, similarity, isInfected</p>
            
            {props.items.filter(searchPrediction)
            .map((val) => {
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