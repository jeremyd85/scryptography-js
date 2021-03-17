const roomPlan = require('roomPlan');
const structures = {
    "spawn": STRUCTURE_SPAWN,
    "extension": STRUCTURE_EXTENSION,
    "rampart": STRUCTURE_RAMPART,
    "road": STRUCTURE_ROAD,
    "tower": STRUCTURE_TOWER
};

function planBuild(room) {
    let xPosOffset = roomPlan.RCL2.spawn.pos[0].x - room.find(FIND_MY_SPAWNS)[0].pos.x;
    let yPosOffset = roomPlan.RCL2.spawn.pos[0].y - room.find(FIND_MY_SPAWNS)[0].pos.y;
    var constructionSites = {};
    switch (room.controller.level) {
        case 0:
        case 1:
            break;
        case 2:
            constructionSites = RCL2;
            break;
        case 3:
        default:
            constructionSites = RCL3;
            break;
    }
    for (var constructionSite in constructionSites) {
        for (var coord in constructionSites[constructionSite].pos) {
            room.createConstructionSite(coord.x-xPosOffset, coord.y-yPosOffset, structures[constructionSite])
        }
    }
}

module.exports = planBuild;