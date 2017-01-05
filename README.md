# roll-dice

[![Build Status](https://travis-ci.org/rdennis/roll-dice.svg?branch=master)](https://travis-ci.org/rdennis/roll-dice)

A dice rolling engine.


## Usage

There are two ways to roll dice.
* standard dice format: `d20`, `2d8+2`
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

## 1.0 Roadmap
- [x] Allow for custom parsers
- [ ] Documentation :poop:
- [ ] I don't know, something AMAZING <sub><sup>I guess...</sup></sub>
