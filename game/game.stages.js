/**
 * # Game stages definition file
 * Copyright(c) 2021  <>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

     stager
        .next('consent')
        .next('instructions')
        .next('survey-demo1')
        .next('survey-demo2')
        .next('survey-finance')
        .next('survey-inequality')
        .next('survey-politics')
        .next('sdo')
        .next('group_malleability')
        .next('end')
        .gameover();

    // Notice: here all stages have one step named after the stage.

    // Skip one stage.
    // stager.skip('instructions');

    // Skip multiple stages:
    // stager.skip([ 'instructions', 'quiz' ])

    // Skip a step within a stage:
    // stager.skip('stageName', 'stepName');

};
