/**
 * # Bot type implementation of the game stages
 * Copyright(c) 2021 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(treatmentName, settings, stager,
                          setup, gameRoom, node) {

    stager.setDefaultCallback(function() {
        node.timer.random.done();
    });
};
