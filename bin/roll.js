#!/usr/bin/env node
let DiceRoller = require('../src/dice-roller');
let StandardParser = require('../src/parsers/standard-parser');

let roller = new DiceRoller();

// only add StandardParser
roller.parsers.splice(0, roller.parsers.length, StandardParser);

// roll each input
let inputs = process.argv.slice(2);

if (inputs.length < 1) {
    console.log('No input');
    return;
}

inputs.forEach((input, index) => {
    let output = `"${input}": `;
    let result = roller.roll(input);

    if (result instanceof DiceRoller.InvalidInputError) {
        output += 'Invalid Input';
    } else {
        output += `${result.result}`;

        if (result.rolls.length > 1 || result.modifier !== 0) {
            output += ` (${result.rolls})`;
        }

        if (result.modifier > 0) {
            output += `+${result.modifier}`;
        }

        if (result.modifier < 0) {
            output += `${result.modifier}`;
        }
    }

    console.log(output);
});