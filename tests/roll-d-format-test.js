// tests/roll-d-format-test.js
'use strict';

let chai = require('chai');
let expect = chai.expect;
let DiceRoller = require('./../src/dice-roller');

describe('DiceRoller - d# format', () => {
    it('roll("d20") should return an object with a result property between 1 and 20, inclusively', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll('d20')).to.have.property('result')
            .that.is.within(1, 20);
    });

    it('roll("2d10") should roll 2 dice', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll('2d10')).to.have.property('rolls')
            .with.length(2);
    });

    it('roll("20d8") should roll 20 dice, all within the range [1-8]', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll('20d8')).to.have.property('rolls')
            .with.length(20)
            .and.satisfy(r => r.every(v => v >= 1 && v <= 8));
    });

    it('roll("d%") should roll a d100', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll('d%')).to.have.property('faces', 100);
    });

    it('roll("d20+2") should roll a d20 and add 2', () => {
        let diceRoller = new DiceRoller();
        let result = diceRoller.roll('d20+2');

        expect(result).to.have.property('modifier', +2);
        expect(result).to.satisfy(r => {
            let modifier = r.modifier;
            let initialRoll = r.rolls.reduce((total, value) => total + value, 0);
            let target = modifier + initialRoll;

            return r.result === target;
        });
    });

    it('roll("d20") should not return the same result 50 times in a row', () => {
        let diceRoller = new DiceRoller();
        let results = [];

        for (let i = 0; i < 50; i++) {
            // we only care about .result at this point
            results.push(diceRoller.roll('d20').result);
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