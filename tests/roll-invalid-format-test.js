// tests/roll-invalid-format-test.js
'use strict';

let chai = require('chai');
let expect = chai.expect;
let DiceRoller = require('./../src/dice-roller');

describe('DiceRoller - <invalid> format', () => {
    /* Invalid input */
    it('roll() should return an invalid object if no string is passed in', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll()).to.be.an.instanceof(DiceRoller.InvalidInputError);
    });

    let tests = [
        undefined,
        null,
        '',
        'foo-bar',
        'dG',
        '10dT',
        '[ some face ]',
        'd2O', // uppercase 'o'
        '[ | ]',
        '[ | | ]',
        '[]',
        '[a|',
        '[ ]',
        '[a]',
        '[ a ]',
        '[||||]',
        '[  |   |     |]',
        '[ | | | ]',
        '[             |   ]',
    ];

    for (let i = 0, l = tests.length; i < l; i++) {
        let test = tests[i];

        it(`roll("${test}") should return an invalid object with the provided string if an invalid string is passed in`, () => {
            let diceRoller = new DiceRoller();
            expect(diceRoller.roll(test)).to.be.an.instanceof(DiceRoller.InvalidInputError)
                .and.to.have.property('input', test);
        });
    }
});