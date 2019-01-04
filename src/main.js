var roleHarvester = require('role.harvester');


module.exports.loop = function () {
    // for every creep name in Game.creeps
    for (let name in Game.creeps) {

        // get the creep object
        var creep = Game.creeps[name];
        roleHarvester.run(creep);

    }
};
