/**
 * # Logic type implementation of the game stages
 * 
 * Copyright(c) 2021 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

const ngc = require('nodegame-client');
const J = ngc.JSUS;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    let channel = gameRoom.channel;
    let memory = node.game.memory;

    // Make the logic independent from players position in the game.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    // Must implement the stages here.

    stager.setOnInit(function() {

        // Feedback.
        memory.view('feedback').stream({
            format: 'csv',
            header: [ 'time', 'timestamp', 'player', 'feedback' ]
        });

        // Email.
        memory.view('email').stream({
            format: 'csv',
            header: [ 'timestamp', 'player', 'email' ]
        });

        // Times.
        memory.stream({
            filename: 'times.csv',
            format: 'csv',
            delay: 20000,
            header: [
                'session', 'treatment', 'player', 'stage', 'step', 'round', 'stageId', 'stepId', 'timestamp', 'time'
            ],
            stageNum2Id: false // TODO: this should be default FALSE
        });


        node.on.data('end', function(msg) {

          let client = channel.registry.getClient(msg.from);
          if (!client) return;

          if (client.checkout) {
            // Just resend bonus
            gameRoom.computeBonus({
                clients: [ msg.from ],
                dump: false
             });
          }
          else {

            // Adding extra coins (as an example).
            gameRoom.updateWin(msg.from, settings.COINS);

            // Compute total win.
            gameRoom.computeBonus({
                clients: [ msg.from ]
            });

            // Mark client checked out.
            channel.registry.checkOut(msg.from);

            // Select all 'done' items and save everything as json.
            memory.select('done').save('memory_all.json');

          }

        });
    });

    stager.setOnGameOver(function() {
        // Something to do.
    });
};
