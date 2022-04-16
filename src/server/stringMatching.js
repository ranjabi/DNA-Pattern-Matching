exports.kmpMatch = function (text, pattern) {
    let n = text.length;
    let m = pattern.length;

    const fail = computeFail(pattern);
    let i = 0;
    let j = 0;

    while (i < n) {
        if (text.charAt(i) === pattern.charAt(j)) {
            if (j === m - 1) {
                return i - m + 1;
            }
            i++;
            j++;
        } else if (j > 0) {
            j = fail[j - 1];
        } else {
            i++;
        }
    }
    
    return -1;
};

exports.bmMatch = function (text, pattern) {
    const last = buildLast(pattern);
    let n = text.length;
    let m = pattern.length;
    let i = m-1;

    if (i > n-1) {
        return -1;
    }

    let j = m-1;
    do {
        if (text.charAt(i) === pattern.charAt(j)) {
            if (j === 0) {
                return i;
            } else {
                i--;
                j--;
            }
        } else {
            const lo = last[text.charAt(i)];
            i = i + m - Math.min(j, 1 + lo);
            j = m - 1;
        }
    } while (i <= n-1);

    return -1;
};

const computeFail = (pattern) => {
    let m = pattern.length;
    const fail = new Array(m);
    fail[0] = 0;
    let j = 0;
    let i = 1;

    while (i < m) {
        if (pattern.charAt(i) === pattern.charAt(j)) {
            fail[i] = j + 1;
            i++;
            j++;
        } else if (j > 0) { 
            j = fail[j - 1];
        } else {
            fail[i] = 0;
            i++;
        }
    }
    
    return fail;
}


const buildLast = (pattern) => {
    const last = new Array(128);
    for (let i = 0; i < 128; i++) {
        last[i] = -1;
    }

    for (let i = 0; i < pattern.length; i++) {
        last[pattern.charAt(i)] = i;
    }

    return last;

}