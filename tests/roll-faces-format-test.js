// tests/roll-faces-format-test.js
'use strict';

let chai = require('chai');
let expect = chai.expect;
let DiceRoller = require('./../src/dice-roller');

describe('DiceRoller - [ faces ] format', () => {
    it('roll("[cat|dog|fish]") should return an object with a result property of cat, dog, or fish', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll('[cat|dog|fish]')).to.have.property('result')
            .that.is.oneOf(['cat', 'dog', 'fish']);
    });

    it('roll("[cat|dog|fish]") should return an object with a faces property of [cat, dog, fish]', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll('[cat|dog|fish]')).to.have.property('faces')
            .that.is.eql(['cat', 'dog', 'fish']);
    });

    it('roll("[ thing one | thing two ]") should return an object with a result property of thing one, or thing two', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll('[ thing one | thing two ]')).to.have.property('result')
            .that.is.oneOf(['thing one', 'thing two']);
    });

    it('roll("[cat|dog|fish]") should not return the same result 50 times in a row', () => {
        let diceRoller = new DiceRoller();
        let results = [];

        for (let i = 0; i < 50; i++) {
            // we only care about .result at this point
            results.push(diceRoller.roll('[cat|dog|fish]').result);
        }

        // validate that there are at least two distinct strings in results
        expect(results).to.satisfy(r => {
            for (let i = 1; i < r.length - 1; i++) {
                if (r[i] != r[i - 1]) {
                    return true;
                }
            }
            return false;
        });
    });
});