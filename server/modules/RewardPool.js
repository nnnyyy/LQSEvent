/**
 * Created by nnnyyy on 2018-11-26.
 */
'use strict'

class RewardPool {
    constructor() {
        this.gachalist = [];
        this.init();
    }

    init() {
        this.gachalist.push({ itemsn: '10000', droprate: 98000 });
        this.gachalist.push({ itemsn: '10001', droprate: 600 });
        this.gachalist.push({ itemsn: '10002', droprate: 1400 });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}