const TARGET_WORKER = 10;
const TARGET_BUILDER = 5;
const CREEP_LIMIT = 15;


function spawnCreeps(room) {
    spawns = room.find(FIND_MY_SPAWNS);
    creeps = room.find(FIND_MY_CREEPS);
    var currWorkerCount = 0;
    var currBuilderCount = 0;
    for (var creep in creeps) {
        switch (creep.memory.role) {
            case "worker":
                currWorkerCount++;
                break;
            case "builder":
                currBuilderCount++;
                break;
        }
    }
    var currTotalCreeps = currBuilderCount + currWorkerCount;
    const targetWorkerRatio = TARGET_WORKER / CREEP_LIMIT;
    const targetBuilderRatio = TARGET_BUILDER / CREEP_LIMIT;
    var currBuilderRatio = 0;
    var currWorkerRatio = 0;
    for (var spawn in spawns) {
        currWorkerRatio = currWorkerCount / currTotalCreeps;
        currBuilderRatio = currBuilderCount / currTotalCreeps;
        if (currWorkerRatio < targetWorkerRatio) {
            let status = spawn.spawnCreep([WORK, CARRY, MOVE], 'worker' + Game.time, {
                memory: { role: 'worker' }
            });
            if (status == OK) {
                currWorkerRatio++;
                currTotalCreeps++;
            }
        } else if (currBuilderRatio < targetBuilderRatio) {
            let status = spawn.spawnCreep([WORK, CARRY, MOVE], 'builder' + Game.time, {
                memory: { role: 'builder' }
            });
            if (status == OK) {
                currBuilderRatio++;
                currTotalCreeps++;
            }
        }
    }
}

module.exports = spawnCreeps;
