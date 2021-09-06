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
    TIMER: {
        examination: null,
        debrief: null,
        end_of_game: 180000
    },

    // # Game specific properties

    // // Number of game rounds to repeat.
    // ROUNDS: 1,

    // // Number of coins available each round.
    // COINS: 100,

    // // Exchange rate coins to dollars.
    // EXCHANGE_RATE: 0.05,

    // Don't use any treatments
    NO_TREATMENTS: false,

    // Don't use task
    NO_TASK: false,

    // if (NO_TREATMENTS) {
    //     debrief_page: 'debrief_pilot_task.html';
    // } else if {
    //     debrief_page: 'debrief_pilot_treatment.html';
    // } else {
    //     debrief_page: 'debrief.html';
    // }

    // debrief: {
    //     treatment: 'debrief_pilot_treatment.html',
    //     task: 'debrief_pilot_task.html'
    // }

};