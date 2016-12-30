let DiceRoller = require('roll-dice');
let diceRoller = new DiceRoller();

let result1 = diceRoller.roll('d20');
let result2 = diceRoller.roll('2d8+2');
let result3 = diceRoller.roll('[ cat | dog | fish ]');

console.dir(result1);
console.dir(result2);
console.dir(result3);