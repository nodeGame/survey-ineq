/**
 * # Player type implementation of the game stages
 * Copyright(c) 2023 Stefano Balietti <ste@nodegame.org>
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

module.exports = function (treatmentName, settings, stager, setup, gameRoom) {

    
    const { surveyWidget, capitalizeInput } = gameRoom.use({
        initSurvey: {
            stager: stager
        }
    });
    
    stager.extendStep('instructions', {
        // No need to speficy the html page, by default is <step id>.htm,
        // so here it is: instructions.htm (loaded from public/).
        frame: { 
            replace: {
                // coins: settings.CONSENT.EXP_MONEY,
                time: settings.CONSENT.EXP_TIME
            }
        },
        cb: function () {
            var s;
            // Note: we need to specify node.game.settings,
            // and not simply settings, because this code is
            // executed on the client.
            s = node.game.settings;
            // Replace variable in the instructions.
            W.setInnerHTML('coins', s.CONSENT.EXP_MONEY);

            // Add the DoneButton widget to go the next step inside the
            // element with id "container", set the text on the button to
            // "Next" (default: "Done").
            node.widgets.add('DoneButton', 'container', { text: 'Next' });
        },
        // Custom CSS rules to display the DoneButton centered in the page.
        css: '#donebutton { display: block; margin: 0 auto; }'
    });


    stager.extendStep('consent', {
        donebutton: false,
        widget: 'Consent',
        cb: function () {
            node.on('CONSENT_REJECTING', function () {
                this.discBox.destroy();
            });
        }
        // Uses settings.CONSENT by default (defined in game.settings.js).
    });

    // SURVEY STAGE.
    ////////////////////////////////////////////////////////////////////////////
  
    stager.extendStep('survey-demo1', {
        // Make a widget step.
        widget: J.merge(surveyWidget, {
            forms: [
                {
                    id: 'gender',
                    mainText: 'What is your gender?',
                    choices: [ 'Male', 'Female', 'Non-Binary' ],
                    shuffleChoices: false,
                    other: { width: '95%' },
                    preprocess: capitalizeInput,
                    texts: {
                        other: 'Other',
                        customInput: 'Please name your gender'
                    }
                },
                {
                    name: 'CustomInput',
                    id: 'age',
                    mainText: 'What is your age?',
                    type: 'int',
                    min: 18,
                    width: '95%'
                },
                {
                    id: 'race',
                    selectMultiple: true,
                    mainText: 'Do you identify with any ' +
                        'of the following races/ethnic groups?',
                    choices: ['White', 'African American',
                        'Latino', 'Asian',
                        'American Indian',
                        'Alaska Native',
                        'Native Hawaiian', 'Pacific Islander']
                },
                {
                    name: 'CustomInput',
                    id: 'othereyes',
                    mainText: 'Please say the color of your eyes.',
                    width: '95%',
                    hint: '(If more than one color, order alphabetically ' +
                        'and unite with a dash)',
                    preprocess: capitalizeInput
                },
                {
                    name: 'CustomInput',
                    id: 'language',
                    mainText: 'What is your first language?',
                    preprocess: capitalizeInput,
                    width: '95%',
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
                    width: '95%',
                    requiredChoice: false
                },
            ]
        })
    });


    stager.extendStep('survey-demo2', {
        widget: J.merge(surveyWidget, {
            forms: [
                {
                    id: 'education',
                    mainText: 'What is your highest education level that you have achieved?',
                    choices: [
                        'None', 'Elementary', 'High-School', 'College',
                        'Grad School'
                    ],
                    shuffleChoices: false
                },
                {
                    id: 'employment',
                    mainText: 'What is your employment status?',
                    choices: [
                        'Unemployed', 'Self-employed', 'Employed',
                        'Retired'
                    ]
                },
                {
                    id: 'hardship',
                    mainText: 'Hardship is a condition that causes ' +
                        'difficulty or suffering. In the course ' +
                        'of your life, would you say ' +
                        'that you have experienced hardship?',
                    hint: '(Examples are being ' +
                        'without a job or enough money)',
                    choices: ['Yes', 'No', 'Prefer not to answer'],
                    // requiredChoice: false
                },
                {
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
        })
    });

    stager.extendStep('survey-finance', {
        widget: J.merge(surveyWidget, {
            forms: [
                {
                    id: 'employment',
                    mainText: 'What is your employment status?',
                    choices: [
                        'Unemployed', 'Self-employed', 'Employed',
                        'Retired'
                    ]
                },
                {
                    id: 'ownhouse',
                    mainText: 'Do you own a house or an apartment?',
                    choices: [
                        'Yes', 'No',
                    ],
                    shuffleChoices: false
                },
                {
                    id: 'owncar',
                    mainText: 'Do you own a car?',
                    choices: [
                        'Yes', 'No',
                    ],
                    shuffleChoices: false
                },
                {
                    id: 'income',
                    mainText: 'What number come closest to your ' +
                        'yearly income?',
                    hint: '(in thousands of dollars)',
                    choices: [0, 5]
                        .concat(J.seq(10, 100, 10))
                        .concat(J.seq(120, 200, 20))
                        .concat(J.seq(250, 500, 50))
                        .concat(['500+']),
                    shuffleChoices: false,
                    choicesSetSize: 8,
                    orientation: 'H'
                },
                {
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
                    orientation: 'H',
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
            ]
        })
    });

    const ineqWidget = J.merge(surveyWidget, {
        forms: [
            {
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
                choices: J.seq(1, 7),
                mainText: 'Express your agreement ' +
                    'on a scale from 1 to 7, where 1 means ' +
                    'complete disagreement and 7 complete agreement, ' +
                    'with the following statements.<br/><br/>' +
                    'Socio-economic inequality in the US is mainly ' +
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
                choices: J.seq(1, 7),
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
                choices: J.seq(1, 7),
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
                choices: J.seq(1, 7),
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
            }
        ]
    });
    ineqWidget.formsOptions.orientation = 'H';

    stager.extendStep('survey-inequality', {
        widget: ineqWidget
    });

    stager.extendStep('survey-politics', {
        widget: J.merge(surveyWidget, {
            forms: [
                {
                    id: 'speaker',
                    mainText: 'Who is the current speaker of' +
                        ' the US House of Representatives?',
                    choices: [
                        'Nancy Pelosi',
                        'Mitch McConnell',
                        'Chuck Schumer',
                        'Paul Ryan',
                        'I don\'t know'
                    ]
                    // correctChoice: 0
                },
                {
                    id: 'houseTerm',
                    mainText: 'How long is a complete term for' +
                        ' a member of the US House of Representatives?',
                    choices: [
                        '2 years',
                        '4 years',
                        '6 years',
                        '8 years',
                        'I don\'t know'
                    ],
                    orientation: 'H'
                    // correctChoice: 0
                },
                {
                    id: 'senateTerm',
                    mainText: 'How long is a complete term for' +
                        ' a member of the US Senate?',
                    choices: [
                        '2 years',
                        '4 years',
                        '6 years',
                        '8 years',
                        'I don\'t know'
                    ],
                    orientation: 'H'
                    // correctChoice: 2
                },
                {
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
                        ' that runs free health clinics',
                        'I don\'t know'
                    ],
                    // correctChoice: 2
                },
                {
                    id: 'veto',
                    mainText: 'How much of a majority is required for' +
                        ' the US Senate and US House to override' +
                        ' a presidential veto?',
                    choices: [
                        'One-half',
                        'Two-thirds',
                        'Three-fourths',
                        'Three-fifths',
                        'I don\'t know'
                    ],
                    orientation: 'H'
                    // correctChoice: 1
                },
                {
                    id: 'minWage',
                    mainText: 'What is the federal minimum wage today?',
                    choices: [
                        '$5.25',
                        '$7.25',
                        '$10.50',
                        '$12.50',
                        'I don\'t know'
                    ],
                    orientation: 'H'
                    // correctChoice: 1
                },
                {
                    id: 'infRate',
                    mainText: 'Is the national inflation rate as reported' +
                        ' by the government currently closest to…',
                    choices: [
                        '1%',
                        '6%',
                        '10%',
                        '15%',
                        'I don\'t know'
                    ],
                    orientation: 'H'
                    // correctChoice: 1
                },
                {
                    id: 'primeMinister',
                    mainText: 'Who is the prime minister of Great Britain?',
                    choices: [
                        'Scott Morrison',
                        'Rishi Sunak',
                        'Angela Merkel',
                        'Boris Johnson',
                        'I don\'t know'
                    ],
                    orientation: 'H'
                    // correctChoice: 3
                }
            ]
        })
    });

    // SDO and Group Malleability.

    stager.extendStep('group_malleability', {
        widget: {
            forms: [ 
                {
                    name: 'GroupMalleability',     
                    title: false,
                    panel: false
                }
            ],
            doneBtn: true, // or a string, e.g., "Next"
        }
    });


    stager.extendStep('sdo', {
        name: 'Perception of Groups',
        widget: {
            forms: [ 
                {
                    name: 'SDO',     
                    title: false,
                    panel: false
                }
            ],
            doneBtn: true, // or a string, e.g., "Next",
        }
    });

    stager.extendStep('end', {
        widget: {
            name: 'EndScreen',
            askServer: true,
            feedback: true,
            email: true
         
        }
    });
};
