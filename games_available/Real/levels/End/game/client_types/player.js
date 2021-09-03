/**
 * # Player type implementation of the game stages
 * Copyright(c) 2021 Sam Bateman <samuel.bateman@icloud.com>
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



module.exports = function (treatmentName, settings, stager, setup, gameRoom) {

    stager.extendStep('examination', {
        frame: 'positive_mood.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Done');
        },
    });

    stager.extendStep('debrief', {
        frame: 'debrief.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Done');
        },
    });

    stager.extendStep('end_of_game', {
        init: function () {
            node.game.visualTimer.destroy();
        },
        widget: {
            name: 'EndScreen',
            options: {
                texts: {
                    message: 'You have now completed this task and your responses have been saved. Please go back to the Prolific website and submit your exit code.'
                },
                showEmailForm: true,
                feedback: {
                    minChars: undefined
                }
            },
        },
    });
};
