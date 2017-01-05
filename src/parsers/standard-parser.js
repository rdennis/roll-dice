// src/parsers/standard-parser.js
'use strict';

let InvalidInputError = require('../invalid-input-error');
let RollUtil = require('../roll-util');

const diceMatcher = /^(?:(\d*)d(\d+|%)([+-]\d+)?)$/;

function StandardParser(input) {
    let diceMatch = diceMatcher.exec(input);

    if (diceMatch === null) {
        return new InvalidInputError(input);
    }

    let diceCount = parseInt(diceMatch[1], 10) || 1;
    let dieFaces = diceMatch[2] === '%' ? 100 : parseInt(diceMatch[2], 10);
    let modifier = diceMatch.length > 3 ? parseInt(diceMatch[3]) || 0 : 0;

    // another invalid check just in case
    if (isNaN(dieFaces)) {
        return new InvalidInputError(input);
    }

    let result = modifier || 0;
    let rolls = [];

    for (let i = 0; i < diceCount; i++) {
        let resultFace = RollUtil.getRandomInt(1, dieFaces);
        result += resultFace;
        rolls.push(resultFace);
    }

    return {
        result,
        faces: dieFaces,
        rolls,
        modifier
    };
}

module.exports = StandardParser;