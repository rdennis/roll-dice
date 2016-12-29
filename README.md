# roll-dice

A dice rolling engine.


## Usage

There are two ways to roll dice. You can use the standard dice format (ex. `d20`), or union syntax (ex. `[cat|dog|fish]`);

```js
let DiceRoller = require('dice-roller');
let diceRoller = new DiceRoller();

let result = diceRoller.roll('d20');
// {"result":10,"faces":20,"rolls":[10],"modifier":0}
```

```js
diceRoller.roll('2d8');
// {"result":7,"faces":8,"rolls":[1,6],"modifier":0}

diceRoller.roll('[cat|dog|fish]');
// {"result":"dog","faces":["cat","dog","fish"]}

diceRoller.roll('10d4+2');
/*
{
    "result":25,
    "faces":4,
    "rolls":[2,2,4,1,1,2,1,4,3,3],
    "modifier":2
} 
*/
```