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
        var date = str.split(/-|\/|\s/);
        date[0] = date[0].padStart(2, '0');
        date[1] = convertMonth(date[1]);
        dateSearch = date.join(" ");
        console.log("date " + dateSearch);
        searchMethod = 1;
    } else if (reTglNama1.test(str) || reTglNama2.test(str)) {
        if (reTglNama1.test(str)) {
            var elmt = str.split(/\s/);
            var date = elmt[0].split(/-|\//);
            date[0] = date[0].padStart(2, '0');
            date[1] = convertMonth(date[1]);
            dateSearch = date.join(" ");
            nameSearch = elmt.slice(1, elmt.length).join(" ");
        } else {
            var elmt = str.split(/\s/);
            elmt[0] = elmt[0].padStart(2, '0');
            elmt[1] = convertMonth(elmt[1]);
            dateSearch = elmt.slice(0,3).join(" ");
            nameSearch = elmt.slice(3, elmt.length).join(" ");
        }
        console.log("date " + dateSearch);
        console.log("name " + nameSearch);
        searchMethod = 2;
    } else if (reNama.test(str)) {
        nameSearch = str;
        console.log("name " + nameSearch);
        searchMethod = 3;
    }
    return {
        dateSearch: dateSearch,
        nameSearch: nameSearch,
        searchMethod: searchMethod
    }
}

const convertMonth = (month) => {
    if (month.match(/(j|J)an(?:uary)?/) || month.match(/0?1/)) {
        return "January";
    } else if (month.match(/(f|F)eb(?:ruary)?/) || month.match(/0?2/)) {
        return "February";
    } else if (month.match(/(m|M)ar(?:ch)?/) || month.match(/0?3/)) {
        return "March";
    } else if (month.match(/(a|A)pr(?:il)?/) || month.match(/0?4/)) {
        return "April";
    } else if (month.match(/(May|may)/) || month.match(/0?5/)) {    
        return "May";
    } else if (month.match(/(j|J)un(?:e)?/) || month.match(/0?6/)) {
        return "June";
    } else if (month.match(/(j|J)ul(?:y)?/) || month.match(/0?7/)) {
        return "July";
    } else if (month.match(/(a|A)ug(?:ust)?/) || month.match(/0?8/)) {
        return "August";
    } else if (month.match(/(s|S)ep(?:t)?(?:tember)?/) || month.match(/0?9/)) {
        return "September";
    } else if (month.match(/(o|O)ct(?:ober)?/) || month.match(/10/)) {
        return "October";
    } else if (month.match(/(n|N)ov(?:ember)?/) || month.match(/11/)) {
        return "November";
    } else if (month.match(/(d|D)ec(?:ember)?/) || month.match(/12/)) {
        return "December";
    }
}