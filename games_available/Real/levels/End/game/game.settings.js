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
        // info_and_consent_1: 240000,
        // info_and_consent_2: 240000,
        // title: 20000,

        // pre_task_1: 60000,
        // pre_task_2: 40000,
        // pre_task_3: 40000,
        // pre_task_4: 60000,
        // pre_task_5: 60000,

        // instructions_video: 120000,

        // the_scenario_1: 60000,
        // the_scenario_2: 60000,
        // the_scenario_3: 60000,
        // task_start: 20000,

        // initial_choice: 300000,
        // guided_communication: 300000,
        // message_like: 120000,
        // secondary_choice: 120000,
        // group_choice: 240000,

        // post_task_1: 120000,
        // post_task_2: 120000,
    },

    // # Game specific properties

    // Number of game rounds to repeat.
    ROUNDS: 1,

    // Number of coins available each round.
    COINS: 100,

    // Exchange rate coins to dollars.
    EXCHANGE_RATE: 0.05,

    // Don't use any treatments
    NO_TREATMENTS: false,

    // Don't use task
    NO_TASK: false,



};