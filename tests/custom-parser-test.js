// tests/roll-d-format-test.js
'use strict';

let chai = require('chai');
let expect = chai.expect;
let DiceRoller = require('./../src/dice-roller');
let RollUtil = DiceRoller.RollUtil;

describe('Custom Parser', () => {
    let customMatcher = /^(\d+)$/;
    let customPerser = (input) => {
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

    it('diceRoller.parsers should accept a new parser', () => {
        let diceRoller = new DiceRoller();
        diceRoller.parsers.push(customPerser);

        expect(diceRoller).to.have.property('parsers')
            .and.to.contain(customPerser);
    });

    it('roll("20") should fail without the custom parser', () => {
        let diceRoller = new DiceRoller();
        expect(diceRoller.roll('20')).to.be.an.instanceof(DiceRoller.InvalidInputError);
    });

    it('roll("20") should use the custom parser', () => {
        let diceRoller = new DiceRoller();
        diceRoller.parsers.push(customPerser);

        let result = diceRoller.roll('20');

        expect(result).to.not.be.an.instanceOf(DiceRoller.InvalidInputError);
        expect(result).to.have.property('result').within(1, 20);
        expect(result).to.have.property('faces', 20);
    });
});