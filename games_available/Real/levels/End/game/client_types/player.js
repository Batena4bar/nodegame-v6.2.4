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

    console.log('these settings', settings, gameRoom);

    stager.setOnInit(function () {

        //W.init({ adjustFrameHeight: false });

        // Initialize the client.

        this.addDoneButton = function (label) {
            var doneButton = node.widgets.append('DoneButton', W.getElementById('done-button'), {
                text: label
            });
            doneButton.removeFrame();
            return doneButton;
        }

        node.on.data('PLAYERS', function (msg) {
            // Store a reference to the players for later use.
            node.game.players = msg.data;
            node.game.partners = Object.keys(node.game.players).filter(function (playerId) {
                return playerId !== node.player.id;
            });
            node.game.chatPartners = node.game.partners.map(function (partnerId) {
                return {
                    recipient: partnerId,
                    sender: partnerId,
                    name: node.game.players[partnerId]
                };
            });
            node.player.name = node.game.players[node.player.id];
            console.log('PLAYERS', node.game.players);
            console.log('PARTNERS', node.game.partners);
            console.log('CHAT_PARTNERS', node.game.chatPartners);

            var identity = document.createElement('div');
            identity.classList.add('ng_widget', 'no-panel')
            identity.innerText = `You: ${node.player.name}`;
            header.appendChild(identity);
        });

        node.on.data('INFODATA', function (msg) {
            // Store player's tabData for later use
            console.log('INFODATA', msg.data);
            node.game.infoData = msg.data;
        });

        // Setup page: header + frame.
        var header = W.generateHeader();
        W.generateFrame();

        // Add widgets.
        this.visualStage = node.widgets.append('VisualStage', header);
        this.visualRound = node.widgets.append('VisualRound', header);
        // this.visualTimer = node.widgets.append('VisualTimer', header);
        // this.disconnectBox = node.widgets.append('DisconnectBox', header, {
        //     showDiscBtn: false,
        //     showStatus: true,
        //     connectCb: function () {
        //         alert('Hey you connected!');
        //     }
        // });
    });

    stager.extendStep('examination', {
        frame: 'positive_mood.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Done');
        },
    });

    stager.extendStep('debrief', {
        frame: settings.NO_TREATMENTS ? 'debrief_pilot_task.html' : 'debrief_pilot_treatment.html',
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
