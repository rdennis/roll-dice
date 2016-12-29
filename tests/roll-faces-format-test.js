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

    // faces tests
    let tests = [
        ['cat', 'dog', 'fish'],
        [' cat ', ' dog ', ' fish '],
        ['thing-1', 'thing-2', 'thing-3'],
        ['$', '******', '¯\\_(ツ)_/¯']
    ];

    for (let i = 0, l = tests.length; i < l; i++) {
        let test = tests[i];
        let input = `[${test.join('|')}]`;
        let expected = test.map(x => x.trim());

        it(`roll("${input}") should return an object with a faces property of [${expected.join(', ')}]`, () => {
            let diceRoller = new DiceRoller();
            expect(diceRoller.roll(input)).to.have.property('faces')
                .that.is.eql(expected);
        });
    }

    // repetition test
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