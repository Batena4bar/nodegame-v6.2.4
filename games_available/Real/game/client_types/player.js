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

    // Sets the default globals.
    stager.setDefaultGlobals({
        attentionCheck: null,
    });

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
        var options = {
            rounds: true
        };
        this.visualStage = node.widgets.append('VisualStage', header, options);
        //this.visualRound = node.widgets.append('VisualRound', header);
        //this.visualTimer = node.widgets.append('VisualTimer', header);
        // this.disconnectBox = node.widgets.append('DisconnectBox', header, {
        //     showDiscBtn: false,
        //     showStatus: true,
        //     connectCb: function () {
        //         alert('Hey you connected!');
        //     }
        // });

        // this.doneButton = node.widgets.append('DoneButton', header);

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('info_and_consent_1', {
        frame: 'information_sheet.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('info_and_consent_2', {
        frame: 'consent_form.html',
        donebutton: {
            text: 'Continue',
            enableOnPlaying: false,
        },
        cb: function () {
            var that = this;
            var consentForm = W.getElementById('consent-form');

            consentForm.onclick = function () {
                var allTicked = true;
                for (var i = 0; i < consentForm.elements.length; i++) {
                    allTicked = allTicked && consentForm[i].checked;
                }
                if (allTicked) {
                    that.doneButton.enable();
                } else {
                    that.doneButton.disable();
                }
            };

            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('title', {
        frame: 'title.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Begin');
        },
    });

    stager.extendStep('pre_task_1', {
        frame: 'background_1.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('pre_task_2', {
        frame: 'background_2.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('pre_task_3', {
        frame: 'attention_check_2.html',
        cb: function () {
            var step1 = W.getElementById('step_1');
            var step2 = W.getElementById('step_2');
            this.doneButton = this.addDoneButton('Continue');
            var button = W.getElementById('done');
            button.onclick = function () {
                step1.style = "display: none;";
                step2.style = "display: block;";
                var forms = W.getElementsByTagName('form');
                for (var i = 0; i < forms.length; i++) {
                    forms[i].classList.remove('hide-answers');
                }

                var information = W.getElementById('information');
                var why = information.getElementsByClassName('form-check-input');
                var answer = 'nothing_selected';
                for (var j = 0; j < why.length; j++) {
                    if (why[j].checked) {
                        answer = why[j].value;
                    }
                }
                // console.log('comprehension_1: ' + answer);
                // node.set({ value: { comprehension_1: answer } });
                node.say('SAVE_DATA', 'SERVER', { comprehension_1: answer });
            };
            step2.style = "display: none;"
        },
    });

    stager.extendStep('pre_task_4', {
        frame: 'background_3.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('pre_task_5', {
        frame: 'attention_check_3.html',
        cb: function () {
            var step1 = W.getElementById('step_1');
            var step2 = W.getElementById('step_2');
            this.doneButton = this.addDoneButton('Continue');
            var button = W.getElementById('done');
            button.onclick = function () {
                step1.style = "display: none;";
                step2.style = "display: block;";
                var forms = W.getElementsByTagName('form');
                for (var i = 0; i < forms.length; i++) {
                    forms[i].classList.remove('hide-answers');
                }

                var commoditiesForm = W.getElementById('commodities-form');
                var commodities = [];
                for (var j = 0; j < commoditiesForm.elements.length; j++) {
                    if (commoditiesForm[j].checked) {
                        commodities.push(commoditiesForm[j].value);
                    }
                }
                console.log('comprehension_2', commodities);
                // node.set({ value: { comprehension_2: commodities } });
                node.say('SAVE_DATA', 'SERVER', { comprehension_2: commodities });
            };
            step2.style = "display: none;"
        },
    });

    stager.extendStep('instructions_video', {
        frame: 'video.html',
        // init: function () {
        //     node.game.visualTimer.hide();
        // },
        done: function (data) {
            // console.log('attention_check', node.game.globals.attentionCheck);
            // node.set({ value: { attention_check: node.game.globals.attentionCheck } });
            node.say('SAVE_DATA', 'SERVER', { attention_check: node.game.globals.attentionCheck });
            node.say('LEVEL_DONE');
        },
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
            var title = W.getElementById('title');
            node.game.globals.attentionCheck = false;
            title.onclick = function () {
                node.game.globals.attentionCheck = true;
                node.done();
            }
        },
    });

    // stager.extendStep('examination', {
    //     frame: 'positive_mood.html',
    //     cb: function () {
    //         this.doneButton = this.addDoneButton('Done');
    //     },
    // });

    // stager.extendStep('debrief', {
    //     frame: 'debrief.html',
    //     cb: function () {
    //         this.doneButton = this.addDoneButton('Done');
    //     },
    // });

    // stager.extendStep('end_of_game', {
    //     init: function () {
    //         node.game.visualTimer.destroy();
    //     },
    //     widget: {
    //         name: 'EndScreen',
    //         options: {
    //             texts: {
    //                 message: 'You have now completed this task and your responses have been saved. Please go back to the Prolific website and submit your exit code.'
    //             },
    //             showEmailForm: true,
    //             feedback: {
    //                 minChars: undefined
    //             }
    //         },
    //     },
    // });
};
