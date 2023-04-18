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
 * Complete the 'strokesRequired' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY picture as parameter.
 */


/**
 * - Get minimal colors to paint pictures
 * - Think of problem being: color minimal # of contiguous islands, where each island represented by letter
 * - 
 * 
 * 
 * - Need to only traverse (check) verticall & horizontally
 * 
 * 
 * Plan: 
 * - Make bool matrix where all elements are false (init)
 * - Start at closest false from top left
 * - go right or down if same char & mark as taken (w/ char)
 * 
 * - When all bases completed w/ same char, go to next available bool from top left & next char & increase result++
 * - repeat
 * 
 * 
 */


function markAsVisited(visitedElements, picture, char, x, y) {
    // console.log(char, x, y);
    // console.log(visitedElements);

    if (x < 0 || y < 0 || x >= visitedElements.length || y >= picture[x].length 
        || visitedElements[x][y] || picture[x].charAt(y) != char) {
        return;
    }

    visitedElements[x][y] = true;


    markAsVisited(visitedElements, picture, char, x+1, y);
    markAsVisited(visitedElements, picture, char, x-1, y);
    markAsVisited(visitedElements, picture, char, x, y+1);
    markAsVisited(visitedElements, picture, char, x, y-1);
}

function strokesRequired(picture) {
    if (!Array.isArray(picture)) {
        return 0;
    }

    let visitedElements = [];

    // Create bool matrix to keep track of visited
    for (let i = 0; i < picture.length; i++) {
        let curWord = picture[i];
        let row = [];

        visitedElements.push(row);

        for (let j = 0; j < curWord.length; j++) {
            row.push(false);
        }
    }

    let result = 0;

    // Traverse through possible elements & next false from bM
    for (let i = 0; i < visitedElements.length; i++) {
        let curRow = visitedElements[i];

        for (let j = 0; j < curRow.length; j++) {
            if (!visitedElements[i][j]) {
                console.log(visitedElements);
                let curChar = picture[i].charAt(j);
                // Look for all island elements and mark as visited
                markAsVisited(visitedElements, picture, curChar, i, j);
                result += 1;
            }
        }
    }

    return result;
}

function main() {