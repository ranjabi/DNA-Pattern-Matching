exports.regexSearchTerm = function(str) {
    var dateSearch = "";
    var nameSearch = "";
    var searchMethod = 0;
    // dd/mm/yyyy or dd-mm-yyyy
    const reTgl1 = new RegExp(/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}$/); 
    // dd month yyyy
    const reTgl2 = new RegExp(/^\d{1,2}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:t)?(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s(\d{4})$/) 
    // dd/mm/yyyy namaPenyakit or dd-mm-yyyy namaPenyakit
    const reTglNama1 = new RegExp(/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}\s[\s\S]+$/) 
    // dd month yyyy namaPenyakit
    const reTglNama2 = new RegExp(/^\d{1,2}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:t)?(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s(\d{4})\s[\s\S]+$/) 
    // namaPenyakit
    const reNama = new RegExp(/^[\s\S]+$/) 
    /* 0 : invalid
       1 : valid, input tanggal
       2 : valid, input tanggal namaPenyakit
       3 : valid, input namaPenyakit */
    if (reTgl1.test(str) || reTgl2.test(str)) {
        if (reTgl1.test(str)) {
            var date = str.split(/-|\//);
            date[0] = date[0].padStart(2, '0');
            date[1] = date[1].padStart(2, '0');
            // setDateSearch(date.reverse().join("-"));
            dateSearch = date.reverse().join("-");
        } else {
            var date = str.split(/\s/);
            date[0] = date[0].padStart(2, '0');
            date[1] = convertMonth(date[1]);
            // setDateSearch(date.reverse().join("-"));
            dateSearch = date.reverse().join("-");
        }
        console.log("date " + dateSearch);
        // return 1;
        searchMethod = 1;
    } else if (reTglNama1.test(str) || reTglNama2.test(str)) {
        if (reTglNama1.test(str)) {
            var elmt = str.split(/\s/);
            var date = elmt[0].split(/-|\//);
            date[0] = date[0].padStart(2, '0');
            date[1] = date[1].padStart(2, '0');
            // setDateSearch(date.reverse().join("-"));
            // setNameSearch(elmt.slice(1, elmt.length).join(" "));
            dateSearch = date.reverse().join("-");
            nameSearch = elmt.slice(1, elmt.length).join(" ");
        } else {
            var elmt = str.split(/\s/);
            elmt[0] = elmt[0].padStart(2, '0');
            elmt[1] = convertMonth(elmt[1]);
            // setDateSearch(elmt.slice(0,3).reverse().join("-"));
            // setNameSearch(elmt.slice(3, elmt.length).join(" "));
            dateSearch = elmt.slice(0,3).reverse().join("-");
            nameSearch = elmt.slice(3, elmt.length).join(" ");
        }
        console.log("date " + dateSearch);
        console.log("name " + nameSearch);
        // return 2;
        searchMethod = 2;
    } else if (reNama.test(str)) {
        // setNameSearch(str);
        nameSearch = str;
        console.log("name " + nameSearch);
        // return 3;
        searchMethod = 3;
    }
    return {
        dateSearch: dateSearch,
        nameSearch: nameSearch,
        searchMethod: searchMethod
    }
}

const convertMonth = (month) => {
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
    } else if (month.match(/(s|S)ep(?:t)?(?:tember)?/)) {
        return "09";
    } else if (month.match(/(o|O)ct(?:ober)?/)) {
        return "10";
    } else if (month.match(/(n|N)ov(?:ember)?/)) {
        return "11";
    } else if (month.match(/(d|D)ec(?:ember)?/)) {
        return "12";
    }
}