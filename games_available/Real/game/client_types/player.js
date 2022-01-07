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
            rounds: true,
            next: false,
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
        //////////////////////////////////////
        //done: function (data) { 
        //    node.say('LEVEL_DONE');
        //},
        //////////////////////////////////////
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
        frame: 'background_3.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('pre_task_4', {
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

    // stager.extendStep('pre_task_4', {
    //     frame: 'background_3.html',
    //     cb: function () {
    //         this.doneButton = this.addDoneButton('Continue');
    //     },
    // });

    // stager.extendStep('pre_task_5', {
    //     frame: 'attention_check_3.html',
    //     cb: function () {
    //         var step1 = W.getElementById('step_1');
    //         var step2 = W.getElementById('step_2');
    //         this.doneButton = this.addDoneButton('Continue');
    //         var button = W.getElementById('done');
    //         button.onclick = function () {
    //             step1.style = "display: none;";
    //             step2.style = "display: block;";
    //             var forms = W.getElementsByTagName('form');
    //             for (var i = 0; i < forms.length; i++) {
    //                 forms[i].classList.remove('hide-answers');
    //             }

    //             var commoditiesForm = W.getElementById('commodities-form');
    //             var commodities = [];
    //             for (var j = 0; j < commoditiesForm.elements.length; j++) {
    //                 if (commoditiesForm[j].checked) {
    //                     commodities.push(commoditiesForm[j].value);
    //                 }
    //             }
    //             console.log('comprehension_2', commodities);
    //             // node.set({ value: { comprehension_2: commodities } });
    //             node.say('SAVE_DATA', 'SERVER', { comprehension_2: commodities });
    //         };
    //         step2.style = "display: none;"
    //     },
    // });

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

    stager.extendStep('questionnaire_2', {
        frame: 'questionnaire_2.html',
        donebutton: {
            text: 'Next',
            enableOnPlaying: false,
        },
        done: function (data) {
            console.log('fear_factors', node.game.globals.likertTableValues);
            node.set({ value: { fear_factors: node.game.globals.likertTableValues } });
        },
        cb: function () {
            var that = this;

            var items = {
                'Being rejected by other group members?': 0,
                'Being ignored during a conversation?': 0,
                'Being boring to the other group members?': 0,
                'Being excluded from a conversation?': 0,
                'Making a bad first impression?': 0,
                'Other group members not approving of you?': 0,
                'Other group members finding a fault with you?': 0,
            }

            var options = {
                id: 'post_task_1',
                items: Object.keys(items),
                choices: [1, 2, 3, 4, 5, 6, 7],
                shuffleItems: true,
                requiredChoice: true,
                left: 'Lowest',
                right: 'Highest',
                onclick: function (question, answer, deselecting) {
                    items[question] = deselecting ? 0 : answer + 1;
                    var answers = Object.values(items);
                    var allAnswered = true;
                    for (var index = 0; index < answers.length; index++) {
                        if (answers[index] === 0) {
                            allAnswered = false;
                            break;
                        }
                    }
                    if (allAnswered) {
                        node.game.globals.likertTableValues = likertTableWidget.getValues();
                        console.log('fear_factors ->', node.game.globals.likertTableValues);
                        that.doneButton.enable();
                    } else {
                        that.doneButton.disable();
                    }
                }
            };
            // Create and append the widget to the body of the page.
            var likertTable = W.getElementById('likert_table');
            var likertTableWidget = node.widgets.append('ChoiceTableGroup', likertTable, options);
            var panelHeading = W.getElementsByClassName('panel-heading')[0];
            panelHeading.remove();
            var choicetableHint = W.getElementsByClassName('choicetable-hint')[0];
            choicetableHint.remove();

            this.doneButton = this.addDoneButton('Next');
        },
    });

    stager.extendStep('questionnaire_1', {
        frame: 'questionnaire_1.html',
        init: function () {
            //node.game.visualTimer.hide();
        },
        donebutton: {
            text: 'Next',
            enableOnPlaying: false,
        },
        done: function (data) {
            console.log('PANAS_fears', node.game.globals.likertTableValues);
            node.set({ value: { fear_factors: node.game.globals.likertTableValues } });
        },
        cb: function () {
            var that = this;

            var items = {
                'Afraid': 0,
                'Scared': 0,
                'Frightened': 0,
                'Nervous': 0,
                'Jittery': 0,
                'Shaky': 0,
            }

            var options = {
                id: 'post_task_2',
                items: Object.keys(items),
                choices: [1, 2, 3, 4, 5, 6, 7],
                shuffleItems: true,
                requiredChoice: true,
                left: 'Lowest',
                right: 'Highest',
                onclick: function (question, answer, deselecting) {
                    items[question] = deselecting ? 0 : answer + 1;
                    var answers = Object.values(items);
                    var allAnswered = true;
                    for (var index = 0; index < answers.length; index++) {
                        if (answers[index] === 0) {
                            allAnswered = false;
                            break;
                        }
                    }
                    if (allAnswered) {
                        node.game.globals.likertTableValues = likertTableWidget2.getValues();
                        console.log('PANAS_fears ->', node.game.globals.likertTableValues);
                        that.doneButton.enable();
                    } else {
                        that.doneButton.disable();
                    }
                }
            };
            // Create and append the widget to the body of the page.
            var likertTable2 = W.getElementById('likert_table_2');
            var likertTableWidget2 = node.widgets.append('ChoiceTableGroup', likertTable2, options);
            var panelHeading = W.getElementsByClassName('panel-heading')[0];
            panelHeading.remove();
            var choicetableHint = W.getElementsByClassName('choicetable-hint')[0];
            choicetableHint.remove();

            this.doneButton = this.addDoneButton('Next');
        },
    });
};
