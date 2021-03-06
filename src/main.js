// import modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    // goal: have 10 harvesters and as many upgraders as possible
    var minimumNumberOfHarvesters = 6;
    var minimumNumberOfBuilders = 2;
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var name = undefined;

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false});
    }
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // else try to spawn an upgrader
        // small change from what you saw in the video: for upgraders it makes
        //  more sense to have two move parts because they have to travel further
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'builder', working: false});
    }
    else {
        // else try to spawn an upgrader
        // small change from what you saw in the video: for upgraders it makes
        //  more sense to have two move parts because they have to travel further
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    }

    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)) {
        console.log("Spawned new " + Game.creeps[name].memory.role + " creep: " + name);
    }
    var rclp = Game.spawns.Spawn1.room.controller.progress;
    var rclpt = Game.spawns.Spawn1.room.controller.progressTotal;
    var rclpercent = rclp/rclpt*100;

    var gclp = Game.gcl.progress;
    var gclpt = Game.gcl.progressTotal;
    var gclpercent = gclp/gclpt*100;

    if (Game.time % 100 == 0){
      console.log("---------------------------------------------------")
      console.log("----------------------Creeps-----------------------")
      console.log("Harvester Creeps: " + numberOfHarvesters)
      console.log("Builder Creeps  : " + numberOfBuilders)
      console.log("Upgrader Creeps : " + numberOfUpgraders)
      console.log("------------------------RCL------------------------")
      console.log("RCL             : " + Game.spawns.Spawn1.room.controller.level )
      console.log("RCL ENG         : " + rclp + "/" + rclpt + " - " + rclpercent.toFixed(2) + "%")
      console.log("------------------------GCL------------------------")
      console.log("GCL             : " + Game.gcl.level )
      console.log("GCL ENG         : " + gclp + "/" + Math.round(gclpt) + " - " + gclpercent.toFixed(2) + "%")
      console.log("------------------------CPU------------------------")
      console.log("CPU Usage       : " + Game.cpu.getUsed() )
      console.log("CPU Limit       : " + Game.cpu.limit )
      console.log("CPU Bucket      : " + Game.cpu.bucket + "/10000")
      console.log("---------------------------------------------------")
    }

};
