module.exports = {
  run: function(creep) {

    // if creep is bringing energy to the spawn but has no energy left
    if (creep.memory.full == true && creep.carry.energy == 0) {
        // switch state
        creep.memory.full = false;
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.full == false && creep.carry.energy == creep.carryCapacity) {
        // switch state
        creep.memory.full = true;
    }

    // if creep is supposed to transfer energy to the spawn
    if (creep.memory.full == true) {
        // try to transfer energy, if the spawn is not in range
        if (creep.upgradeCotroller(creep.room.controller) == ERR_NOT_IN_RANGE) {
            // move towards the spawn
            creep.moveTo(creep.room.controller);
        }
    }
    // if creep is supposed to harvest energy from source
    else {
        // find closest source
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.moveTo(source);
        }
    }
  }

};
