/**
 * # Bot type implementation of the game stages
 * Copyright(c) 2021  <>
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

    stager.extendStep('game', {
        cb: () => {
            node.timer.random.done({ greater: Math.random() > 0.5 });
        }
    });
};
