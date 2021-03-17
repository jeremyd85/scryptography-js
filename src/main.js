const role = require('./role')
const roomSpawner = require('room/spawner')
const roomBuildPlanner = require('room/buildPlanner')

module.exports.loop = function () {
    // run each creep role see /creeps/index.js
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        let r = creep.memory.role;
        if (creepLogic[r]) {
            creepLogic[r].run(creep);
        }
    }

    // free up memory if creep no longer exists
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}
