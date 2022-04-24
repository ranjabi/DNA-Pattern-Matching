const max = (a, b) => a > b ? a : b;
 
const lcs = (text, pattern) => {
    var m = text.length;
    var n = pattern.length;

    var L = new Array(m + 1);
    for(var i = 0; i < L.length; i++) {
        L[i] = new Array(n + 1);
    }
    
    var i, j;
     
    for(i = 0; i <= m; i++) {
        for(j = 0; j <= n; j++) {
            if (i == 0 || j == 0)
                L[i][j] = 0;
            else if (text[i - 1] == pattern[j - 1])
                L[i][j] = L[i - 1][j - 1] + 1;
            else
                L[i][j] = max(L[i - 1][j], L[i][j - 1]);
        }
    }
    return L[m][n];
}

exports.rateLCS = function (text, pattern) {
    let lcsLength = lcs(text, pattern);
    let lcsRate = lcsLength / pattern.length;
    return lcsRate;
};


// const rateLCS = (text, pattern) => {
//     let lcsLength = lcs(text, pattern);
//     let lcsRate = lcsLength / pattern.length;
//     console.log("lcsRate: " + lcsRate);
//     console.log("pattern.length: " + pattern.length);
//     console.log("lcsLength: " + lcsLength);
//     return lcsRate;
// }

// console.log(rateLCS("GCGCGCGCTCTACG", "ACGACA"));
// console.log(rateLCS("AATGACCTAAA", "GACCTTGA"));