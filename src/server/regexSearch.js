exports.regexSearchTerm = function(str) {
    var dateSearch = "";
    var nameSearch = "";
    var searchMethod = 0;
    // dd/mm/yyyy or dd-mm-yyyy
    const reTgl1 = new RegExp(/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}$/); 
    // dd month yyyy
    const reTgl2 = new RegExp(/^\d{1,2}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:t)?(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s(\d{4})$/);
    // yyyy/mm/dd or yyyy-mm-dd
    const reTgl3 = new RegExp(/^\d{4}(\/|-)\d{1,2}(\/|-)\d{1,2}$/);
    // yyyy month dd
    const reTgl4 = new RegExp(/^\d{4}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:t)?(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s\d{1,2}$/);
    // dd/mm/yyyy namaPenyakit or dd-mm-yyyy namaPenyakit
    const reTglNama1 = new RegExp(/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}\s[\s\S]+$/) 
    // dd month yyyy namaPenyakit
    const reTglNama2 = new RegExp(/^\d{1,2}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:t)?(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s(\d{4})\s[\s\S]+$/);
    // yyyy/mm/dd namaPenyakit or yyyy-mm-dd namaPenyakit
    const reTglNama3 = new RegExp(/^\d{4}(\/|-)\d{1,2}(\/|-)\d{1,2}\s[\s\S]+$/);
    // yyyy month dd namaPenyakit
    const reTglNama4 = new RegExp(/^\d{4}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:t)?(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s\d{1,2}\s[\s\S]+$/);
    // namaPenyakit dd/mm/yyyy or namaPenyakit dd-mm-yyyy namaPenyakit
    const reNamaTgl1 = new RegExp(/^[\s\S]+\s\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}$/);
    // namaPenyakit dd month yyyy
    const reNamaTgl2 = new RegExp(/^[\s\S]+\s\d{1,2}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:t)?(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s(\d{4})$/);
    // namaPenyakit yyyy/mm/dd or namaPenyakit yyyy-mm-dd
    const reNamaTgl3 = new RegExp(/^[\s\S]+\s\d{4}(\/|-)\d{1,2}(\/|-)\d{1,2}$/);
    // namaPenyakit yyyy month dd
    const reNamaTgl4 = new RegExp(/^[\s\S]+\s\d{4}\s((j|J)an(?:uary)?|(f|F)eb(?:ruary)?|(m|M)ar(?:ch)?|(a|A)pr(?:il)?|(May|may)|(j|J)un(?:e)?|(j|J)ul(?:y)?|(a|A)ug(?:ust)?|(s|S)ep(?:t)?(?:tember)?|(o|O)ct(?:ober)?|(n|N)ov(?:ember)?|(d|D)ec(?:ember)?)+\s\d{1,2}$/);
    // namaPenyakit
    const reNama = new RegExp(/^[\s\S]+$/) 
    /* 0 : invalid
       1 : valid, input tanggal
       2 : valid, input tanggal namaPenyakit or namaPenyakit tanggal
       3 : valid, input namaPenyakit */
    if (reTgl1.test(str) || reTgl2.test(str) || reTgl3.test(str) || reTgl4.test(str)) {
        var date = str.split(/-|\/|\s/);
        date[1] = convertMonth(date[1]);
        if (reTgl1.test(str) || reTgl2.test(str)) {
            // date[0] = date[0].padStart(2, '0');
            date[0] = convertDate(date[0]);
            dateSearch = date.join(" ");
        } else {
            // date[2] = date[2].padStart(2, '0');
            date[2] = convertDate(date[2]);
            dateSearch = date.reverse().join(" ");
        }
        console.log("date " + dateSearch);
        searchMethod = 1;
    } else if (reTglNama1.test(str) || reTglNama2.test(str) || reTglNama3.test(str) || reTglNama4.test(str) || reNamaTgl1.test(str) || reNamaTgl2.test(str) || reNamaTgl3.test(str) || reNamaTgl4.test(str)) {
        var elmt = str.split(/\s/);
        if (reTglNama1.test(str) || reTglNama3.test(str) || reNamaTgl1.test(str) || reNamaTgl3.test(str)) {
            if (reTglNama1.test(str) || reTglNama3.test(str)) {
                var date = elmt[0].split(/-|\//);
                nameSearch = elmt.slice(1, elmt.length).join(" ");
            } else {
                var date = elmt[elmt.length-1].split(/-|\//);
                nameSearch = elmt.slice(0, elmt.length-1).join(" ");
            }
            date[1] = convertMonth(date[1]);
            if (reTglNama1.test(str) || reNamaTgl1.test(str)) {
                // date[0] = date[0].padStart(2, '0');
                date[0] = convertDate(date[0]);
                dateSearch = date.join(" ");
            } else {
                // date[2] = date[2].padStart(2, '0');
                date[2] = convertDate(date[2]);
                dateSearch = date.reverse().join(" ");
            }
        } else {
            if (reTglNama2.test(str) || reTglNama4.test(str)) {
                var x = 0;
                nameSearch = elmt.slice(3, elmt.length).join(" ");
            } else {
                var x = elmt.length - 3;
                nameSearch = elmt.slice(0, elmt.length-3).join(" ");
            }
            elmt[1+x] = convertMonth(elmt[1+x]);
            if (reTglNama2.test(str) || reNamaTgl2.test(str)) {
                // elmt[0+x] = elmt[0+x].padStart(2, '0');
                elmt[0+x] = convertDate(elmt[0+x]);
                dateSearch = elmt.slice(0+x,3+x).join(" ");
            } else {
                // elmt[2+x] = elmt[2+x].padStart(2, '0');
                elmt[2+x] = convertDate(elmt[2+x]);
                dateSearch = elmt.slice(0+x,3+x).reverse().join(" ");
            }
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
        nameSearch: nameSearch.toLowerCase(),
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

const convertDate = (date) => {
    const reDate = new RegExp(/0\d/);
    if (reDate.test(date)) {
        return date.slice(1, 2);
    } else {
        return date;
    }
}