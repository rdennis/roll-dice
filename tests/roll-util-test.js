// tests/roll-util-test.js
'use strict';

let chai = require('chai');
let expect = chai.expect;
let RollUtil = require('./../src/roll-util');

describe('RollUtil', () => {
    it('getRandomInt(min, max) should have inclusive upper and lower bounds', () => {
        let results = {};

        // get a bunch of random numbers from 1..2 and make sure we get 1 and 2
        for(let i = 0; i < 100; i++) {
            let randInt = RollUtil.getRandomInt(1, 2);

            results[randInt] = (results[randInt] ? results[randInt] + 1 : 1);
        }

        expect(results).to.have.property('1');
        expect(results).to.have.property('2');
    });
});