// src/dice-roller.js
'use strict';

const facesMatcher = /^(?:\[(\s*(?:[^|[\]]+\s*)+(?:\s*\|\s*(?:[^|[\]]+\s*)+)+\s*)\])$/;
const diceMatcher = /^(?:(\d*)d(\d+|%)([+-]\d+)?)$/;

/* private helpers */
let rollDice = (input) => {
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
        let resultFace = getFaceIndex(dieFaces);
        result += resultFace;
        rolls.push(resultFace);
    }

    return {
        result,
        faces: dieFaces,
        rolls,
        modifier
    };
};

let rollFaces = (input) => {
    let faceMatch = facesMatcher.exec(input);

    if (faceMatch === null) {
        return new InvalidInputError(input);
    }

    let faces = faceMatch[1].split('|').map(face => face.trim());
    let faceIndex = getFaceIndex(faces.length - 1);
    let result = faces[faceIndex - 1].trim();

    return {
        result,
        faces
    };
};

/** Get an integer from [1-max] inclusive */
let getFaceIndex = (max) => {
    return Math.floor(Math.random() * max) + 1;
};

/* DiceRoller */
class DiceRoller {
    roll(input) {
        let result = rollDice(input);

        if (result instanceof InvalidInputError) {
            result = rollFaces(input);
        }

        return result;
    }
}

class InvalidInputError {
    constructor(input) {
        this.input = input;
    }
}

module.exports = DiceRoller;
module.exports.InvalidInputError = InvalidInputError;