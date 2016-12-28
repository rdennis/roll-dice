// tests/dice-roller-public-test.js
'use strict';

let chai = require('chai');
let expect = chai.expect;
let DiceRoller = require('./../src/dice-roller');

describe('DiceRoller - public api', () => {
    /* Invalid input */
    it('roll() should be the only visible property', () => {
        let diceRoller = new DiceRoller();

        // todo: update if public api gets more methods 
        expect(diceRoller).to.respondTo('roll')
            .and.to.satisfy(o => Object.keys(o).length < 1);
    });
});