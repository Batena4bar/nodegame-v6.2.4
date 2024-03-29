/**
 * # Game settings definition file
 * Copyright(c) 2021 Sam Bateman <samuel.bateman@icloud.com>
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
    TIMER: {
        info_and_consent_1: null,
        info_and_consent_2: null,
        questionnaire_1: null,
        questionnaire_2: null,
        title: null,

        pre_task_1: null,
        pre_task_2: null,
        pre_task_3: null,
        pre_task_4: null,

        instructions_video: null,


    },

    // # Game specific properties

    // Number of game rounds to repeat.
    ROUNDS: 1,

    // Number of coins available each round.
    COINS: 100,

    // Exchange rate coins to dollars.
    EXCHANGE_RATE: 1,

    // Don't use any treatments
    NO_TREATMENTS: false,

    // Don't use task
    NO_TASK: false,


    // # Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.

    treatments: {

        // control: {
        //     description: "No fear applied.",
        //     treatment: 'task_start.html',
        //     treatment_2: 'task_start.html',
        //     treatment_3: 'task_start.html'
        // },

        internal_evaluation: {
            description: "Internally originated Interpersonal Rejection fear applied.",
            treatment: 'treatment_internal_eval_vin.html',
            treatment_2: 'treatment_2_internal_eval.html',
        },

        external_evaluation: {
            description: "Externally originated Interpersonal Rejection fear applied.",
            treatment: 'treatment_external_eval_vin.html',
            treatment_2: 'treatment_2_external_eval.html'
        },

        control: {
            description: "No treatment pages.",
        },

        // internal_repraisal: {
        //     description: "Internally originated Repraisal fear applied from vingette.",
        //     treatment: 'treatment_internal_repraisal_vin.html',
        //     treatment_2: 'treatment_2_internal_rep.html',
        //     treatment_3: 'treatment_internal_reprisal.html'
        // },

        // external_repraisal: {
        //     description: "Externally originated Repraisal fear applied from vingette.",
        //     treatment: 'treatment_external_repraisal_vin.html',
        //     treatment_2: 'treatment_2_external_rep.html',
        //     treatment_3: 'treatment_external_reprisal.html'
        // }
    }
};