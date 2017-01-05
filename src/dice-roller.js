// src/dice-roller.js
'use strict';

let InvalidInputError = require('./invalid-input-error');
let RollUtil = require('./roll-util');
let StandardParser = require('./parsers/standard-parser');
let FaceParser = require('./parsers/face-parser');

const facesMatcher = /^\[((?:\s*[^\s|[\]]+\s*)+(?:\|(?:\s*[^\s|[\]]+\s*)+)+)\]$/;

/* DiceRoller */
class DiceRoller {
    constructor() {
        this.parsers = [StandardParser, FaceParser];
    }

    roll(input) {
        let result = new InvalidInputError(input);

        for (let i = 0, l = this.parsers.length; i < l; i++) {
            result = this.parsers[i](input);

            if (!(result instanceof InvalidInputError)) {
                break;
            }
        }

        return result;
    }
}

module.exports = DiceRoller;
module.exports.InvalidInputError = InvalidInputError;
module.exports.RollUtil = RollUtil;