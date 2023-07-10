/**
 * # Game stages definition file
 * Copyright(c) 2021 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function (treatmentName, settings, stager, setup, gameRoom) {
    stager
        
        .stage("instructions")
        
        .stage("consent")

        .stage("survey")
            .step("survey-demo1")
            .step("survey-demo2")
            .step("survey-finance")
            .step("survey-inequality")
            .step("survey-politics")
        
        .next("sdo")
        
        .next("group_malleability")
        
        .next("end")
        
    // Notice: here all stages have one step named after the stage.

    // Skip one stage.
    stager.skip("instructions");
    stager.skip("consent");

    // Skip multiple stages:
    // stager.skip([ 'instructions', 'quiz' ])

    // Skip a step within a stage:
    // stager.skip('stageName', 'stepName');
};
