/**
 * # Game settings definition file
 * Copyright(c) 2023 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * The variables in this file will be sent to each client and saved under:
 *
 *   `node.game.settings`
 *
 * The name of the chosen treatment will be added as:
 *
 *    `node.game.settings.treatmentName`
 *
 * http://www.nodegame.org
 * ---
 */

let basePay = 3;

module.exports = {

    // Variables shared by all treatments.

    // #nodeGame properties:

    /**
     * ### CONSENT (object) [nodegame-property]
     *
     * Contains info to be added to the page by the Consent widget
     *
     */
    CONSENT: {

        EXP_TITLE: 'Learning How To Create Surveys in NodeGame',

        EXP_PURPOSE: 'The purpose of the study is to show you how to create surveys in nodeGame.',

        EXP_DESCR: 'You will complete an online survey in which you will be asked a few questions. That is what surveys do, right?',

        EXP_TIME: '20',

        EXP_MONEY: '$' + basePay + ' USD'
    },

    BASE_PAY: basePay,

    // # Game specific properties

    // Number of coins available each round.
    COINS: 1,

    // # Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.

    treatments: {

        standard: {
            description: "Standard Treatment"
        }

        //pressure: {
            //description: "Short times to take decisions",
            //guess: 5000
        //}

    }
};
