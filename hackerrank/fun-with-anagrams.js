'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'funWithAnagrams' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY text as parameter.
 */

function funWithAnagrams(text) {
    if( !Array.isArray(text)) {
        return [];
    }

    const result = [];
    const dict = {};

    for (let i = 0; i < text.length; i++) {

        // Get copy of word and sort by alphanumeric
        const cur = text[i].split('').sort().join();

        if (!dict[cur]) {
            dict[cur] = true;
            result.push(text[i])
        }
    }

    return result.sort();
}

function main() {