/**
 * # Player type implementation of the game stages
 * Copyright(c) 2021  <>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

const ngc = require('nodegame-client');
const J = ngc.JSUS;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {


    // Define a function for future use.
    function capitalizeInput(input) {
        var str;
        str = input.value;
        str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
        input.value = str;
    }

    // Make the player step through the steps without waiting for other players.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    stager.setOnInit(function() {

        // Initialize the client.

        var header;

        // Setup page: header + frame.
        header = W.generateHeader();
        W.generateFrame();

        // Add widgets.
        this.visuaStage = node.widgets.append('VisualStage', header);
        this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header, {
            hidden: true // Initially hidden.
        });

        this.doneButton = node.widgets.append('DoneButton', header, {
            text: 'Next'
        });

        // No need to show the wait for other players screen in single-player
        // games.
        W.init({ waitScreen: false });

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('instructions', {
        frame: 'instructions.htm',
        cb: function() {
            var s;
            // Note: we need to specify node.game.settings,
            // and not simply settings, because this code is
            // executed on the client.
            s = node.game.settings;
            // Replace variables in the instructions.
            W.setInnerHTML('coins', s.COINS);
        }
    });

    stager.extendStep('Survey-demo1', {
        cb: function() {
            // Modify CSS rules on the fly.
            W.cssRule('.choicetable-left, .choicetable-right ' +
                      '{ width: 200px !important; }');

            W.cssRule('table.choicetable td { text-align: left !important; ' +
                      'font-weight: normal; padding-left: 10px; }');
        },

        // Make a widget step.
        widget: {
        name: 'ChoiceManager',
        ref: 'demo1',
        options: {
            id: 'demo1',
            mainText: 'Your demographics.',
            forms: [
                {
                    name: 'ChoiceTable',
                    id: 'gender',
                    mainText: 'What is your gender?',
                    choices: [ 'Male', 'Female', 'Other' ],
                    shuffleChoices: false,
                    onclick: function(value, removed) {
                        var w;
                        w = node.widgets.lastAppended.formsById.othergender;
                        if ((value === 2) && !removed) w.show();
                        else w.hide();
                        W.adjustFrameHeight();
                    },
                    preprocess: capitalizeInput
                },
                {
                    name: 'CustomInput',
                    id: 'age',
                    mainText: 'What is your age?',
                    type: 'int',
                    min: 18,
                    // requiredChoice: false
                },
                {
                    name: 'CustomInput',
                    id: 'othergender',
                    mainText: 'Please name your gender.',
                    width: '100%',
                    hidden: true
                },
                {
                    name: 'ChoiceTable',
                    id: 'race',
                    selectMultiple: true,
                    mainText: 'Do you identify with any ' +
                    'of the following races/ethnic groups?',
                    choices: [ 'White', 'African American',
                    'Latino', 'Asian',
                    'American Indian',
                    'Alaska Native',
                    'Native Hawaiian', 'Pacific Islander' ]
                },
                {
                    name: 'CustomInput',
                    id: 'othereyes',
                    mainText: 'Please say the color of your eyes.',
                    width: '100%',
                    hint: '(If more than one color, order alphabetically ' +
                    'and unite with a dash)',
                    preprocess: capitalizeInput
                },
                {
                    name: 'CustomInput',
                    id: 'language',
                    mainText: 'What is your first language?',
                    preprocess: capitalizeInput,
                    width: '100%',
                },
                {
                    name: 'CustomInput',
                    id: 'otherlanguage',
                    mainText: 'Do you speak other languages? If Yes, ' +
                    'list them here, otherwise leave empty.',
                    type: 'list',
                    hint: '(if <em>English</em> is not your first ' +
                    'language, list it first; if you speak more ' +
                    'than one language, separate them with comma)',
                    // Too messy to do it here, ', ' gets expanded.
                    // This overwrite default one.
                    // preprocess: function(input) {
                    //    var str;
                    //    str = input.value.toLowerCase();
                    //    str = str.replace(/+,*/g, function(txt) {
                    //        return txt.charAt(0).toUpperCase() +
                    //            txt.substr(1) + ',';
                    //    });
                    //    input.value = str;
                    // },
                    width: '100%',
                    requiredChoice: false
                },
            ],
            formsOptions: {
                requiredChoice: true,
                shuffleChoices: true
            },
            className: 'centered'
        }
    },
    done: function(values) {
        // Simplify data structure.
        return values.forms;
    }
    });


    stager.extendStep('Survey-demo2', {
    widget: {
        name: 'ChoiceManager',
        ref: 'demo2',
        options: {
            id: 'demo2',
            mainText: 'Your demographics.',
            forms: [
                {
                    name: 'ChoiceTable',
                    id: 'education',
                    mainText: 'What is your highest education level?',
                    choices: [
                        'None', 'Elementary', 'High-School', 'College',
                        'Grad School'
                    ],
                },
                {
                    name: 'ChoiceTable',
                    id: 'employment',
                    mainText: 'What is your employment status?',
                    choices: [
                        'Unemployed', 'Self-employed', 'Employed',
                        'Retired'
                    ]
                },
                {
                    name: 'ChoiceTable',
                    id: 'income',
                    mainText: 'What number come closest to your ' +
                    'yearly income?',
                    hint: '(in thousands of dollars)',
                    choices: [0, 5]
                    .concat(J.seq(10, 100, 10))
                    .concat(J.seq(120, 200, 20))
                    .concat(J.seq(250, 500, 50))
                    .concat([ '500+' ]),
                    shuffleChoices: false,
                    choicesSetSize: 8
                },
                {
                    name: 'ChoiceTable',
                    id: 'hardship',
                    mainText: 'Hardship is a condition that causes ' +
                    'difficulty or suffering. In the course ' +
                    'of your life, would you say ' +
                    'that you have experienced hardship?',
                    hint: '(Examples are being ' +
                    'without a job or enough money)',
                    choices: [ 'Yes', 'No', 'Prefer not to answer' ],
                    // requiredChoice: false
                },
                {
                    name: 'ChoiceTable',
                    id: 'socialmedia',
                    mainText: 'Do you spend time on social media?',
                    choices: [
                        'I am a very active user',
                        'I am a somewhat active user',
                        'I rarely use them',
                        'I never use them'
                    ]
                }
            ],
            formsOptions: {
                requiredChoice: true,
                shuffleChoices: true
            },
            className: 'centered'
        }
    },
    done: function(values) {
        // Simplify data structure.
        return values.forms;
    }
});

stager.extendStep('Survey-finance', {
    widget: {
        name: 'ChoiceManager',
        options: {
            id: 'demo3',
            mainText: 'Job, and finances.',
            forms: [
                {
                    name: 'ChoiceTable',
                    id: 'employment',
                    mainText: 'What is your employment status?',
                    choices: [
                        'Unemployed', 'Self-employed', 'Employed',
                        'Retired'
                    ]
                },
                {
                    name: 'ChoiceTable',
                    id: 'ownhouse',
                    mainText: 'Do you own a house or an apartment?',
                    choices: [
                        'Yes', 'No',
                    ],
                    shuffleChoices: false
                },
                {
                    name: 'ChoiceTable',
                    id: 'owncar',
                    mainText: 'Do you own a car?',
                    choices: [
                        'Yes', 'No',
                    ],
                    shuffleChoices: false
                },
                {
                    name: 'ChoiceTable',
                    id: 'income',
                    mainText: 'What number come closest to your ' +
                    'yearly income?',
                    hint: '(in thousands of dollars)',
                    choices: [0, 5]
                    .concat(J.seq(10, 100, 10))
                    .concat(J.seq(120, 200, 20))
                    .concat(J.seq(250, 500, 50))
                    .concat([ '500+' ]),
                    shuffleChoices: false,
                    choicesSetSize: 8
                },
                {
                    name: 'ChoiceTable',
                    id: 'studentdebt',
                    mainText: 'Do you have a student debt?',
                    choices: [
                        'Yes, and it is large',
                        'Yes, but it is manageable',
                        'No, I have paid it off',
                        'No, I never had it'
                    ],
                    shuffleChoices: false
                },
                {
                    name: 'ChoiceTableGroup',
                    id: 'incomeclass',
                    mainText: 'To which social class do you feel ' +
                    'you belong?',
                    hint: '(If unsure, make your best guess)',
                    choices: [
                        'Bottom', 'Lower', 'Lower-Middle',
                        'Middle',
                        'Upper-Middle', 'Upper', 'Elite'
                    ],
                    items: [
                        {
                            id: 'now',
                            left: 'Now'
                        },
                        {
                            id: 'child',
                            left: 'As a child'
                        },
                        {
                            id: 'future',
                            left: 'In the future'
                        }
                    ],
                    shuffleChoices: false
                }
            ],
            formsOptions: {
                requiredChoice: true,
                shuffleChoices: true
            },
            className: 'centered'
        }
    },
    done: function(values) {
        // Simplify data structure.
        return values.forms;
    }
});

stager.extendStep('Survey-inequality', {
    widget: {
        name: 'ChoiceManager',
        id: 'pol',
        options: {
            mainText: 'Your ' +
            'perception of socio-economic inequality in the US.',
            forms: [
                {
                    name: 'ChoiceTable',
                    id: 'ineqprob',
                    mainText: 'Do you think inequality is a serious ' +
                    'problem in America?',
                    choices: [
                        'Not a problem<br/>at all',
                        'A small<br/>problem',
                        'A problem',
                        'A serious problem',
                        'A very serious problem'
                    ],
                    choicesSetSize: 7
                },
                {
                    name: 'ChoiceTableGroup',
                    id: 'ineq_source_internal',
                    choices: J.seq(1,7),
                    mainText: 'Express your agreement ' +
                    'on a scale from 1 to 7, where 1 means ' +
                    'complete disagreement and 7 complete agreement, ' +
                    'with the following statements.<br/><br/>' +
                    'Socio-economic inequality in the US is mainly '+
                    'caused by:<br/><br/>' +
                    'Personal Factors:',
                    items: [
                        {
                            id: 'talent',
                            left: 'Some people are more talented'
                        },
                        {
                            id: 'workhard',
                            left: 'Some people work harder'
                        },
                        {
                            id: 'easierjobs',
                            left: 'Some people prefer easier, ' +
                            'low-paying jobs'
                        }
                    ]
                },
                {
                    name: 'ChoiceTableGroup',
                    id: 'ineq_source_economic',
                    choices: J.seq(1,7),
                    mainText: 'Economic Factors:',
                    items: [
                        {
                            id: 'globalization',
                            left: 'Globalization has squeezed the salary' +
                            '<br/>of lower-income families'
                        },
                        {
                            id: 'techchange',
                            left: 'Technological change has raised<br/> ' +
                            'the salary of highly-educated workers'
                        },
                        {
                            id: 'finance',
                            left: 'Salaries of people working in<br/>' +
                            'financial sector are driving inequality'
                        }
                    ]
                },
                {
                    name: 'ChoiceTableGroup',
                    id: 'ineq_source_political',
                    choices: J.seq(1,7),
                    mainText: 'Political Factors:',
                    items: [
                        {
                            id: 'lobbies',
                            left: 'Interests lobbies in Washington'
                        },
                        {
                            id: 'minorities',
                            left: 'Discrimination against some minorities'
                        },
                        {
                            id: 'restricted_edu',
                            left: 'Restricted access to high-quality ' +
                            'education'
                        },
                        {
                            id: 'policies',
                            left: 'Social policies in favor of workers ' +
                            'and unions<br/>have been removed by ' +
                            'politicians'
                        }
                    ]
                },
                {
                    name: 'ChoiceTableGroup',
                    id: 'ineq_source_luck',
                    choices: J.seq(1,7),
                    mainText: 'Luck:',
                    items: [
                        {
                            id: 'family',
                            left: 'Family one is born into'
                        },
                        {
                            id: 'luck',
                            left: 'Other external events'
                        }
                    ]
                },
            ],
            formsOptions: {
                requiredChoice: true,
                // shuffleChoices: true
            },
            className: 'centered'
        }
    },
    done: function(values) {
        // Simplify data structure.
        return values.forms;
    }
});

stager.extendStep('Survey-politics', {
    widget: {
        name: 'ChoiceManager',
        id: 'pol2',
        options: {
            mainText: 'Political knowledge questions.',
            forms: [
                {
                    name: 'ChoiceTable',
                    id: 'speaker',
                    mainText: 'Who is the current speaker of' +
                    ' the US House of Representatives?',
                    choices: [
                         'Nancy Pelosi',
                         'Mitch McConnell',
                         'Chuck Schumer',
                         'Paul Ryan'
                    ],
                    correctChoice: 0
                },
                {
                    name: 'ChoiceTable',
                    id: 'houseTerm',
                    mainText: 'How long is a complete term for'  +
                    ' a member of the US House of Representatives?',
                    choices: [
                         '2 years',
                         '4 years',
                         '6 years',
                         '8 years'
                    ],
                    correctChoice: 0
                },
                {
                    name: 'ChoiceTable',
                    id: 'senateTerm',
                    mainText: 'How long is a complete term for' +
                    ' a member of the US Senate?' ,
                    choices: [
                         '2 years',
                         '4 years',
                         '6 years',
                         '8 years'
                    ],
                    correctChoice: 2
                },
                {
                    name: 'ChoiceTable',
                    id: 'medicare',
                    mainText: 'What is Medicare?',
                    choices: [
                      'A program run by state governments to provide' +
                      ' health care to poor people',
                      'A private health insurance' +
                      ' plan sold to individuals in all 50 states',
                      'A program run by the US federal government to pay' +
                      ' for old people’s health care',
                      'A private, non-profit organization' +
                      ' that runs free health clinics'
                    ],
                    correctChoice: 2
                },
                {
                    name: 'ChoiceTable',
                    id: 'veto',
                    mainText: 'How much of a majority is required for' +
                    ' the US Senate and US House to override' +
                    ' a presidential veto?',
                    choices: [
                      'One-half',
                      'Two-thirds',
                      'Three-fourths',
                      'Three-fifths'
                    ],
                    correctChoice: 1
                },
                {
                    name: 'ChoiceTable',
                    id: 'minWage',
                    mainText: 'What is the federal minimum wage today?',
                    choices: [
                      '$5.25',
                      '$7.25',
                      '$10.50',
                      '$12.50'
                    ],
                    correctChoice: 1
                },
                {
                    name: 'ChoiceTable',
                    id: 'infRate',
                    mainText: 'Is the national inflation rate as reported' +
                    ' by the government currently closest to…',
                    choices: [
                       '1%',
                       '6%',
                       '10%',
                       '15%'
                    ],
                    correctChoice: 0
                },
                {
                    name: 'ChoiceTable',
                    id: 'primeMinister',
                    mainText: 'Who is the prime minister of Great Britain?',
                    choices: [
                       'Scott Morrison',
                       'Justin Trudeau',
                       'Angela Merkel',
                       'Boris Johnson'
                    ],
                    correctChoice: 3
                },

            ],
            formsOptions: {
                shuffleChoices: true
            },
            className: 'centered'
        }
    },
    done: function(values) {
        // Simplify data structure.
        return values.forms;
    }
});


    stager.extendStep('end', {
      widget: {
          name: 'EndScreen',
          options: {
              feedback: true,
              email: true
          }
      },
      init: function() {
        node.say('end');
        node.game.visualTimer.destroy();
        node.game.doneButton.destroy();
      }
    });
};
