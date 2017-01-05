// tests/dice-roller-public-test.js
'use strict';

let chai = require('chai');
let expect = chai.expect;
let DiceRoller = require('./../src/dice-roller');

describe('DiceRoller - public api', () => {
    it('roll() and parsers should be the only visible properties', () => {
        let diceRoller = new DiceRoller();

        // todo: update if public api gets more methods 
        expect(diceRoller).to.respondTo('roll')
            .and.to.satisfy(o => Object.keys(o).length === 1)
            .and.to.have.property('parsers');
    });
});