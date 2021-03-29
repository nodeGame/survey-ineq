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

module.exports = function(stager, settings) {

     stager
        .next('instructions')
        .next('Survey-demo1')
        .next('Survey-demo2')
        .next('Survey-finance')
        .next('Survey-inequality')
        .next('Survey-politics')
        .next('end')
        .gameover();

    // Modify the stager to skip one stage.
    // stager.skip('instructions');

    // To skip a step within a stage use:
    // stager.skip('stageName', 'stepName');
    // Notice: here all stages have just one step.
};
