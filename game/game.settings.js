/**
 * # Game settings definition file
 * Copyright(c) 2021  <>
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
     * ### TIMER (object) [nodegame-property]
     *
     * Maps the names of the steps of the game to timer durations
     *
     * If a step name is found here, then the value of the property is
     * used to initialize the game timer for the step.
     */
    //TIMER: {

    //},

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

    // Number of game rounds to repeat.
    //ROUNDS: 4,

    // Number of coins available each round.
    COINS: 1,

    // Exchange rate coins to dollars.
    //EXCHANGE_RATE: 1,

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
