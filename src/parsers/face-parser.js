// src/parsers/face-parser.js
'use strict';

let InvalidInputError = require('../invalid-input-error');
let RollUtil = require('../roll-util');

const facesMatcher = /^\[((?:\s*[^\s|[\]]+\s*)+(?:\|(?:\s*[^\s|[\]]+\s*)+)+)\]$/;

function FaceParser(input) {
    let faceMatch = facesMatcher.exec(input);

    if (faceMatch === null) {
        return new InvalidInputError(input);
    }

    let faces = faceMatch[1].split('|').map(face => face.trim());
    let faceIndex = RollUtil.getRandomInt(0, faces.length - 1);
    let result = faces[faceIndex].trim();

    return {
        result,
        faces
    };
}

module.exports = FaceParser;