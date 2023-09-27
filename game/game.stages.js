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

            .step('survey-intro-demo')
            .step("survey-demo1")
            .step("survey-demo2")
            
            .step('survey-intro-finance')
            .step("survey-finance")

            .step('survey-intro-ineq-pol')
            .step("survey-inequality")
            .step("survey-politics")
        
        .stage('intro-end')

        .stage("sdo")
        
        .stage("group_malleability")
        
        .stage("end")
        
    // Notice: here all stages have one step named after the stage.

    // Skip one stage.
    // stager.skip("consent");

    // Skip multiple stages at once:
    // stager.skip([ 'consent', 'instructions' ])

    // Skip a step within a stage:
    // stager.skip('survey', 'survey-finance');
};
