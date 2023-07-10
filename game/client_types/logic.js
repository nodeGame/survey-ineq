/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2023 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

const ngc = require("nodegame-client");
const J = ngc.JSUS;

module.exports = function (treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    let channel = gameRoom.channel;
    let memory = node.game.memory;

    // The logic does not advance in the game, only players do.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    stager.setOnInit(function () {

        gameRoom.use({
        
            // Automatically handle clients finishing the survey.
            // Replies to clients ending the survey, saves bonus and ip files.
            
            // Conf object passed to `GameRoom.computeBonus()`, e.g., 
            // mod = {
            //     amt: true,
            //     prolific: true
            // };
            singlePlayerEndGame: true,
            
            // Save memory database to file at regular intervals.
            // Conf object:
            // {
            //     memory: true,    // => memory.json
            //     email: true,     // => email.csv
            //     feedback: true,  // => feedback.csv
            //     times: true      // => times.csv
            // }
            defaultStreams: true
        });

        // Important!
        // @api gameRoom.use()  
        // is experimental and might change or be removed in future releases.
    });
};
