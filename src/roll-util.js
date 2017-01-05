// src/roll-util.js
'use strict';

class RollUtil {
    /** Get an integer from [min-max] inclusive */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = RollUtil;