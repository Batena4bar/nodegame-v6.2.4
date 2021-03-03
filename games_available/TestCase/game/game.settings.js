/**
 * # Game settings: Ultimatum Game
 * Copyright(c) 2019 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://www.nodegame.org
 */

module.exports = {

    // Minimum number of players that must be always connected.
    MIN_PLAYERS: 3,

    // Number or rounds to repeat the bidding. *
    REPEAT: 5,

    // Number of coins to split. *
    COINS: 12,

    // Divider ECU / DOLLARS *
    EXCHANGE_RATE: (1/1000),

    EXCHANGE_RATE_INSTRUCTIONS: 0.001,

    // TIMER.
    // If the name of a key of the TIMER object matches the name of one
    // of the steps or stages, its value is automatically used as the
    // value of the `timer` property of that step/stage.
    //
    // The timer property is read by `node.game.timer` and by VisualTimer
    // widgets, if created. It can be:
    //
    //  - a number (in milliseconds),
    //  - a function returning the number of milliseconds,
    //  - an object containing properties _milliseconds_, and _timeup_
    //      the latter being the name of an event to emit or a function
    //      to execute when the timer expires. If _timeup_ is not set,
    //      property _timeup_ of the game step will be used.
    TIMER: {
        groupTaskWarning: 30000,
        background1: 60000,
        background2: 60000,
        preTask1: 60000,
        preTask2: 60000,
        video: 80000,
        taskStartPage: 30000,
        initialChoice: 90000,
        guidedCommunication: 120000,
        messageLiking: 30000,
        groupChoice: 90000,
    },

    // Available treatments:
    // (there is also the "standard" treatment, using the options above)
    treatments: {

        standard: {
            description: "The warning message given is the standard one.",
            WAIT_TIME: 20,
            instructionsPage: 'groupTaskWarning.html'
        },

        internal: {
            description: "The warning message given is the internal threat condition.",
            WAIT_TIME: 20,
            instructionsPage: 'groupTaskWarning_internal.html'
        }

        external: {
            description: "The warning message given is the external threat condition.",
            WAIT_TIME: 20,
            instructionsPage: 'groupTaskWarning_external_ind.html'
        }

        both: {
            description: "The warning message given is the external, threat condition.",
            WAIT_TIME: 20,
            instructionsPage: 'groupTaskWarning_external_group.html'
        }
    }


    // * =  If you change this, you need to update
    // the instructions and quiz static files in public/
};
