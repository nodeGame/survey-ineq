/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2021  <>
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
        memory.view('feedback').save('feedback.csv', {
            header: [ 'time', 'timestamp', 'player', 'feedback' ],
            keepUpdated: true
        });

        // Email.
        memory.view('email').save('email.csv', {
            header: [ 'timestamp', 'player', 'email' ],
            keepUpdated: true
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

            // Coins for the questions.
            gameRoom.updateWin(msg.from, (settings.COINS), {
                clear: true
            });

            // Compute total win.
            gameRoom.computeBonus({
                clients: [ msg.from ]
            });

            // Mark client checked out.
            channel.registry.checkOut(msg.from);

            // Select all 'done' items and save its time.
            memory.select('done').save('times.csv', {
                header: [
                    'session', 'player', 'stage', 'step', 'round',
                    'time', 'timeup'
                    ],
                    append: true
            });

            // Select all 'done' items and save everything as json.
            memory.select('done').save('memory_all.json');

          }

        });
    });

    stager.setOnGameOver(function() {
        // Something to do.
    });
};
