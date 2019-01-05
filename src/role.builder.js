module.exports = {
    // a function to run the logic for this role
    run: function(creep) {

        if (creep.memory.full)
            creep.say("B - Build");
        else {
            creep.say("B - H");
        }

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
            var constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                // move towards the spawn
                creep.moveTo(constructionSite);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
