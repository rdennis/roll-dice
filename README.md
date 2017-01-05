# roll-dice

[![Build Status](https://travis-ci.org/rdennis/roll-dice.svg?branch=master)](https://travis-ci.org/rdennis/roll-dice)

A dice rolling engine.


## Usage

There are two ways to roll dice.
* standard dice format: `d20`, `2d8+2`, `d%`
* union syntax: `[cat|dog|fish]`, `[ red | green | blue ]`, `[thing one|thing two|thing three]`

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

diceRoller.roll('[thing one|thing two|thing three]');
// {"result":"thing two","faces":["thing one","thing two","thing three"]}

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

## Custom Parsers
As of v0.2, the parser list can be manipulated to add, remove, or reorder parsers. A parser is a simple function that takes a string input and returns either a `DiceRoller.InvalidInputError` object, or a result object.

Here's an example that uses a simple digit string to roll dice.

```js
let DiceRoller = require('roll-dice');
let RollUtil = DiceRoller.RollUtil;

let customMatcher = /^(\d+)$/;

let customParser = (input) => {
    let match = customMatcher.exec(input);

    if(match === null) {
        return new DiceRoller.InvalidInputError(input);
    }

    let faces = parseInt(match[1], 10);
        
    if(faces < 2) {
        return new DiceRoller.InvalidInputError(input);
    }

    let result = RollUtil.getRandomInt(1, faces);

    return {
        result,
        faces
    };
};

let diceRoller = new DiceRoller();

let result = diceRoller.roll('20');
// InvalidInputError

diceRoller.parsers.push(customParser);

result = diceRoller.roll('20');
// {"result":5,"faces":20}
```

## 1.0 Roadmap
- [x] Allow for custom parsers
- [ ] Standardized result contract?
  - Probably something like `{ result: any, roll: fn }` where `roll()` will return another result set using the same input
- [ ] Documentation :poop:
- [ ] I don't know, something AMAZING <sub><sup>I guess...</sup></sub>
