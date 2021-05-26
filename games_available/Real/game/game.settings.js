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
        title: 120000,
        pre_task_1: 120000,
        pre_task_2: 120000,
        pre_task_3: 120000,
        pre_task_4: 120000,
        pre_task_5: 120000,
        instructions_video: null,
        treatment_page: 80000
    },

    // # Game specific properties

    // Number of game rounds to repeat.
    ROUNDS: 1,

    // Number of coins available each round.
    COINS: 100,

    // Exchange rate coins to dollars.
    EXCHANGE_RATE: 0.05,

    // # Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.

    treatments: {

        control: {
            description: "No fear applied.",
            treatment: 'treatment_control.html'
        },

        internal_rejection: {
            description: "Internally originated Interpersonal Rejection fear applied.",
            treatment: 'treatment_internal_rejection.html'
        },

        external_rejection: {
            description: "Externally originated Interpersonal Rejection fear applied.",
            treatment: 'treatment_external_rejection.html'
        },

        internal_evaluation: {
            description: "Internally originated Negative Evaluation fear applied.",
            treatment: 'treatment_internal_evaluation.html'
        },

        external_evaluation: {
            description: "Externally originated Negative Evaluation fear applied.",
            treatment: 'treatment_external_evaluation.html'
        },

        internal_rej_vin: {
            description: "Internally originated Interpersonal Rejection fear from vingette.",
            treatment: 'treatment_internal_rej_vin.html'
        },

        external_rej_vin: {
            description: "Externally originated Interpersonal Rejection fear from vingette.",
            treatment: 'treatment_external_rej_vin.html'
        },

        internal_repraisal_vin: {
            description: "Internally originated Repraisal fear applied from vingette.",
            treatment: 'treatment_internal_repraisal_vin.html'
        },

        external_repraisal_vin: {
            description: "Externally originated Repraisal fear applied from vingette.",
            treatment: 'treatment_external_repraisal_vin.html'
        }
    }
};
