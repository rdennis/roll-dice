// sample.js
'use strict';
let colors = require('colors');
let DiceRoller = require('./src/dice-roller');
let args = Array.prototype.slice.call(process.argv, 2);

console.log('roll-dice'.magenta);

if (args.length < 1) {
    console.log('No dice strings were provided.'.red);
    return;
}

let diceRoller = new DiceRoller();
let errors = [];

for (let i = 0, l = args.length; i < l; i++) {
    let input = args[i];
    let result = diceRoller.roll(input);

    let message = '   ';
    let error = false;

    if (result instanceof DiceRoller.InvalidInputError) {
        error = true;
        errors.push(result);
        message += '✗ '.red;
    } else {
        message += '✔︎ '.green;
    }

    message += input.grey + ' ' + (error ? '<error>'.grey.italic :JSON.stringify(result));
    console.log(message);
}