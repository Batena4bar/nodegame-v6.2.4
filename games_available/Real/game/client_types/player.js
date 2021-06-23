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
        tabData: ['dummy'],
        attentionCheck: null,
    });

    stager.setOnInit(function () {

        // Initialize the client.

        this.addDoneButton = function (label) {
            var doneButton = node.widgets.append('DoneButton', W.getElementById('done-button'), {
                text: label
            });
            doneButton.removeFrame();
            return doneButton;
        }

        node.on.data('PARTNERS', function (msg) {
            // Store a reference to the ids for later use.
            node.game.partners = msg.data;
            console.log('Partners', node.game.partners);
        });

        // Setup page: header + frame.
        var header = W.generateHeader();
        W.generateFrame();

        // Add widgets.
        this.visualStage = node.widgets.append('VisualStage', header);
        this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header);
        // this.doneButton = node.widgets.append('DoneButton', header);

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('info_and_consent_1', {
        frame: 'information_sheet.html',
        cb: function () {
            console.log(W)
            W.willResizeFrame = true;
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('info_and_consent_2', {
        frame: 'consent_form.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    // This bit
    stager.extendStep('title', {
        frame: 'title.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Begin');
            node.set({ value: { sam: 'hello' } });
        },
    });

    stager.extendStep('pre_task_1', {
        frame: 'background_1.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('pre_task_2', {
        frame: 'attention_check_1.html',
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
            };
            step2.style = "display: none;"
        },
    });

    stager.extendStep('pre_task_3', {
        frame: 'background_2.html',
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
            };
            step2.style = "display: none;"
        },
    });

    stager.extendStep('pre_task_5', {
        frame: 'background_3.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('pre_task_6', {
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
            };
            step2.style = "display: none;"
        },
    });

    stager.extendStep('instructions_video', {
        frame: 'video.html',
        init: function () {
            node.game.visualTimer.hide();
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
        exit: function () {
            node.set({ value: { attention_check: node.game.globals.attentionCheck } });
            node.game.visualTimer.show();
        },
    });


    stager.extendStep('the_scenario_1', {
        /////////////////////////////////////////////////////////////
        // nodeGame hint: the settings object
        //
        // The settings object is automatically populated with the
        // settings specified for the treatment chosen by the waiting
        // room (file: game.settings.js). Settings are sent to each remote
        // client and it is available under: `node.game.settings`.
        /////////////////////////////////////////////////////////////
        frame: settings.treatment,
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    stager.extendStep('the_scenario_2', {
        frame: settings.treatment_2,
        cb: function () {
            // var justification = W.getElementById('justification');
            // justification.addEventListener('keydown', function (event) {
            //     if (event.target.value < 120) {
            //         this.doneButton.disable();
            //     } else {
            //         this.doneButton.enable();
            //     }
            // })




            this.doneButton = node.widgets.append('DoneButton', W.getElementById('done-button'), {
                text: 'Test',
                enableOnPlaying: false
            });
            this.doneButton.removeFrame();
            this.doneButton.disable();
        },
    });

    stager.extendStep('the_scenario_3', {
        frame: settings.treatment_3,
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    // // The Task

    stager.extendStep('task_start', {
        frame: 'task_start.html',
        cb: function () {
            this.doneButton = this.addDoneButton('Start Task');
        },
    });

    stager.extendStep('initial_choice', {
        frame: 'initial_choice.html',
        donebutton: {
            text: 'Submit Choices',
            enableOnPlaying: false,
        },
        cb: function () {
            // var currentData;
            // var topic = W.getElementById('topic');
            // var justification = W.getElementById('justification');

            // Receive data from logic
            node.on.data('INFODATA', function (msg) {
                console.log('INFODATA', msg.data);
                node.game.globals.tabData = msg.data;
                // Construct infoBar
                var infoBar = W.getElementById('info-bar');
                var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                    data: node.game.globals.tabData,
                    // Extra options available to all widgets.
                    docked: false,
                    collapsible: false,
                    closable: false
                });
                infoBarWidget.removeFrame();
            });

            var linkedSliders = W.getElementById('linked-sliders');
            var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                labels: ['Wheat', 'Sugar', 'Coffee']
            });
            linkedSlidersWidget.removeFrame();
            node.on('complete', function () {
                this.doneButton.enable();
            });
            // Construct done button
            node.on('incomplete', function () {
                this.doneButton.disable();
            });
            this.doneButton = node.widgets.append('DoneButton', linkedSliders);
            this.doneButton.removeFrame();
            this.doneButton.disable();


            // Receive data from infoBar
            // node.on('BUBBLE_DATA', function (data, index) {
            //     console.log('BUBBLE_DATA', data, index);
            //     currentData = data;
            //     topic.innerText = currentData.topic;
            // });



        },
    });

    stager.extendStep('guided_communication', {
        frame: 'guided_communication.html',
        init: function () {
            node.game.visualTimer.hide();
        },
        cb: function () {
            var currentData;
            var topic = W.getElementById('topic');
            var justification = W.getElementById('justification');

            // Receive data from logic
            node.on.data('INFODATA', function (msg) {
                console.log('INFODATA', msg.data);
                node.game.globals.tabData = msg.data;
                // Construct infoBar
                var infoBar = W.getElementById('info-bar');
                var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                    data: node.game.globals.tabData,
                    // Extra options available to all widgets.
                    docked: false,
                    collapsible: false,
                    closable: false
                });
                infoBarWidget.removeFrame();
            });

            // Receive data from infoBar
            node.on('BUBBLE_DATA', function (data, index) {
                console.log('BUBBLE_DATA', data, index);
                currentData = data;
                topic.innerText = currentData.topic;
            });

            // Construct chat
            var chat = W.getElementById('chat');
            var chatWidget = node.widgets.append('Chat', chat, {
                participants: node.game.partners,
                initialMsg: {
                    id: 'game',
                    msg: 'Swap information by chatting...'
                },
                title: '',
                chatEvent: 'CHAT',
                printStartTime: false,
                storeMsgs: true,
                receiverOnly: true,
                docked: false,
                collapsible: false,
                closable: false
            });

            // Attach functionality to chat input form
            var propostionMap = {
                '<': 'worse than',
                '=': 'as good as',
                '>': 'better than'
            }
            var commodity1 = W.getElementById('commodity_1');
            var proposition = W.getElementById('proposition');
            var commodity2 = W.getElementById('commodity_2');
            var button = W.getElementById('send');
            button.onclick = function () {
                if (messageComplete()) {
                    chatWidget.sendMsg({
                        infoId: currentData.id,
                        id: Math.trunc(Math.random() * 10000),
                        senderAlias: 'John',
                        topic: currentData.topic,
                        belief: [commodity1.value, proposition.value, commodity2.value],
                        justification: justification.value,
                        msg: function (data, code) {
                            if (code === 'incoming') {
                                //
                            } else if (code === 'outgoing') {
                                return '<div><strong>' + data.topic + '</strong></div><div>Belief: ' +
                                    data.belief[0] + ' <strong>' + propostionMap[data.belief[1]] + '</strong> ' + data.belief[2] +
                                    '</div><div>' + data.justification + '</div>';
                            }
                        }
                    });
                    currentData = null;
                    topic.innerText = '';
                    commodity1.value = proposition.value = commodity2.value = '';
                    justification.value = '';
                } else {
                    alert('Please complete all message fields');
                }
            };
            var messageComplete = function () {
                return topic.innerText && commodity1.value && proposition.value && commodity2.value && justification.value;
            }

            // Construct done button
            var continueButton = W.getElementById('continue');
            this.doneButton = node.widgets.append('DoneButton', continueButton, {
                text: 'Done Talking',
                enableOnPlaying: false
            });
            this.doneButton.removeFrame();
            this.doneButton.disable();
        },
    });



    stager.extendStep('secondary_choice', {
        frame: 'secondary_choice.html',
        donebutton: {
            text: 'Submit Choices',
            enableOnPlaying: false,
        },
        cb: function () {
            // var currentData;
            // var topic = W.getElementById('topic');
            // var justification = W.getElementById('justification');

            // Receive data from logic
            node.on.data('INFODATA', function (msg) {
                console.log('INFODATA', msg.data);
                node.game.globals.tabData = msg.data;
                // Construct infoBar
                var infoBar = W.getElementById('info-bar');
                var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                    data: node.game.globals.tabData,
                    // Extra options available to all widgets.
                    docked: false,
                    collapsible: false,
                    closable: false
                });
                infoBarWidget.removeFrame();
            });

            var linkedSliders = W.getElementById('linked-sliders');
            var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                labels: ['Wheat', 'Sugar', 'Coffee']
            });
            linkedSlidersWidget.removeFrame();
            node.on('complete', function () {
                console.log('Done', linkedSlidersWidget.getValues());
                this.doneButton.enable();
            });
            // Construct done button
            node.on('incomplete', function () {
                console.log('Undone');
                this.doneButton.disable();
            });
            this.doneButton = node.widgets.append('DoneButton', linkedSliders);
            this.doneButton.removeFrame();
            this.doneButton.disable();


            // Receive data from infoBar
            // node.on('BUBBLE_DATA', function (data, index) {
            //     console.log('BUBBLE_DATA', data, index);
            //     currentData = data;
            //     topic.innerText = currentData.topic;
            // });



        },
    });


    stager.extendStep('group_choice', {
        frame: 'group_choice.html',
        donebutton: {
            text: 'Submit Choices',
            enableOnPlaying: false,
        },
        cb: function () {
            // var currentData;
            // var topic = W.getElementById('topic');
            // var justification = W.getElementById('justification');

            // Construct chat
            var chat = W.getElementById('chat');
            var chatWidget = node.widgets.append('Chat', chat, {
                participants: node.game.partners,
                initialMsg: {
                    id: 'game',
                    msg: 'Swap information by chatting...'
                },
                title: '',
                chatEvent: 'CHAT',
                printStartTime: false,
                storeMsgs: true,
                receiverOnly: false,
                docked: false,
                collapsible: false,
                closable: false
            });

            var linkedSliders = W.getElementById('linked-sliders');
            var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                labels: ['Wheat', 'Sugar', 'Coffee']
            });
            linkedSlidersWidget.removeFrame();
            node.on('complete', function () {
                console.log('Done', linkedSlidersWidget.getValues());
                this.doneButton.enable();
            });
            // Construct done button
            node.on('incomplete', function () {
                console.log('Undone');
                this.doneButton.disable();
            });
            this.doneButton = node.widgets.append('DoneButton', linkedSliders);
            this.doneButton.removeFrame();
            this.doneButton.disable();

        },
    });


    stager.extendStep('post_task_1', {
        frame: 'post_task_1.html',
        cb: function () {

            var items = {
                'Being rejected by other group members?': 0,
                'Being ignored during a conversation?': 0,
                'Being boring to the other group members?': 0,
                'Being excluded from a conversation?': 0,
                'What kind of impression you will make?': 0,
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
                // onclick: function (question, answer, deselecting) {
                //     items[question] = deselecting ? 0 : answer + 1;
                //     var answers = Object.values(items);
                //     var allAnswered = true;
                //     for (var index = 0; index < answers.length; index++) {
                //         if (answers[index] === 0) {
                //             allAnswered = false;
                //             break;
                //         }
                //     }
                //     if (allAnswered) {
                //         this.doneButton.enable();
                //     } else {
                //         this.doneButton.disable();
                //     }
                // }
            };
            // Create and append the widget to the body of the page.
            var likertTable = W.getElementById('likert_table');
            var likertTableWidget = node.widgets.append('ChoiceTableGroup', likertTable, options);
            var panelHeading = W.getElementsByClassName('panel-heading')[0];
            panelHeading.remove();
            var choicetableHint = W.getElementsByClassName('choicetable-hint')[0];
            choicetableHint.remove();

            this.doneButton = this.addDoneButton('Next');
            //this.doneButton.disable();
        },
    });

    stager.extendStep('post_task_2', {
        frame: 'post_task_2.html',
        cb: function () {

            var options = {
                id: 'post_task_2',
                items: [
                    'Afraid',
                    'Scared',
                    'Frightened',
                    'Nervous',
                    'Jittery',
                    'Shaky'
                ],
                choices: [1, 2, 3, 4, 5, 6, 7],
                shuffleItems: true,
                requiredChoice: true,
                left: 'Lowest',
                right: 'Highest'
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

    stager.extendStep('thank_you', {
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

    stager.extendStep('feedback', {
        frame: 'feedback.html',
        cb: function () {
        },
    });

    stager.extendStep('chat', {
        frame: 'chat.html',
        init: function () {
            node.game.visualTimer.hide();
        },
        cb: function () {
            var currentData;
            var topic = W.getElementById('topic');
            var justification = W.getElementById('justification');

            // Receive data from logic
            node.on.data('INFODATA', function (msg) {
                console.log('INFODATA', msg.data);
                node.game.globals.tabData = msg.data;
                // Construct infoBar
                var infoBar = W.getElementById('info-bar');
                var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                    data: node.game.globals.tabData,
                    // Extra options available to all widgets.
                    docked: false,
                    collapsible: false,
                    closable: false
                });
                infoBarWidget.removeFrame();
            });

            // Receive data from infoBar
            node.on('BUBBLE_DATA', function (data, index) {
                console.log('BUBBLE_DATA', data, index);
                currentData = data;
                topic.innerText = currentData.topic;
            });

            // Construct chat
            var chat = W.getElementById('chat');
            var chatWidget = node.widgets.append('Chat', chat, {
                participants: node.game.partners,
                initialMsg: {
                    id: 'game',
                    msg: 'Swap information by chatting...'
                },
                title: '',
                chatEvent: 'CHAT',
                printStartTime: false,
                storeMsgs: true,
                receiverOnly: true,
                docked: false,
                collapsible: false,
                closable: false
            });

            // Attach functionality to chat input form
            var propostionMap = {
                '<': 'worse than',
                '=': 'as good as',
                '>': 'better than'
            }
            var commodity1 = W.getElementById('commodity_1');
            var proposition = W.getElementById('proposition');
            var commodity2 = W.getElementById('commodity_2');
            var button = W.getElementById('send');
            button.onclick = function () {
                if (messageComplete()) {
                    chatWidget.sendMsg({
                        infoId: currentData.id,
                        id: Math.trunc(Math.random() * 10000),
                        senderAlias: 'John',
                        topic: currentData.topic,
                        belief: [commodity1.value, proposition.value, commodity2.value],
                        justification: justification.value,
                        msg: function (data, code) {
                            if (code === 'incoming') {
                                //
                            } else if (code === 'outgoing') {
                                return '<div><strong>' + data.topic + '</strong></div><div>Belief: ' +
                                    data.belief[0] + ' <strong>' + propostionMap[data.belief[1]] + '</strong> ' + data.belief[2] +
                                    '</div><div>' + data.justification + '</div>';
                            }
                        }
                    });
                    currentData = null;
                    topic.innerText = '';
                    commodity1.value = proposition.value = commodity2.value = '';
                    justification.value = '';
                } else {
                    alert('Please complete all message fields');
                }
            };
            var messageComplete = function () {
                return topic.innerText && commodity1.value && proposition.value && commodity2.value && justification.value;
            }

            // Construct done button
            var continueButton = W.getElementById('continue');
            this.doneButton = node.widgets.append('DoneButton', continueButton, {
                text: 'Done Talking',
                enableOnPlaying: false
            });
            this.doneButton.removeFrame();
            this.doneButton.disable();
        },
    });

    stager.extendStep('sliders', {
        frame: 'sliders.html',
        donebutton: {
            text: 'Continue',
            enableOnPlaying: false,
        },
        init: function () {
            node.game.visualTimer.hide();
        },
        cb: function () {
            var linkedSliders = W.getElementById('linked-sliders');
            var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                labels: ['Wheat', 'Sugar', 'Coffee']
            });
            linkedSlidersWidget.removeFrame();
            node.on('complete', function () {
                console.log('Done', linkedSlidersWidget.getValues());
                this.doneButton.enable();
            });
            node.on('incomplete', function () {
                console.log('Undone');
                this.doneButton.disable();
            });
            this.doneButton = node.widgets.append('DoneButton', linkedSliders);
            this.doneButton.removeFrame();
        },
    });

    stager.extendStep('multi_sliders', {
        frame: 'multi_sliders.html',
        donebutton: {
            text: 'Continue',
            enableOnPlaying: false,
        },
        init: function () {
            node.game.visualTimer.hide();
        },
        cb: function () {
            var linkedSliders1 = W.getElementById('linked-sliders-1');
            var linkedSlidersWidget1 = node.widgets.append('LinkedSliders', linkedSliders1, {
                labels: ['Wheat', 'Sugar', 'Coffee']
            });
            linkedSlidersWidget1.removeFrame();

            this.doneButton = node.widgets.append('DoneButton', linkedSliders1);
            this.doneButton.removeFrame();
        },
    });

    // stager.extendStep('quiz', {
    //     init: function() {
    //         node.game.visualTimer.hide();
    //     },
    //     cb: function() {
    //         // Modify CSS rules on the fly.
    //         W.cssRule('.choicetable-left, .choicetable-right ' +
    //                   '{ width: 200px !important; }');

    //         W.cssRule('table.choicetable td { text-align: left !important; ' +
    //                   'font-weight: normal; padding-left: 10px; }');
    //     },

    //     // Make a widget step.
    //     widget: {
    //         name: 'ChoiceManager',
    //         id: 'quiz',
    //         options: {
    //             mainText: 'Answer the following questions to check ' +
    //                       'your understanding of the game.',
    //             forms: [
    //                 {
    //                     name: 'ChoiceTable',
    //                     id: 'howmany',
    //                     mainText: 'How many players are there in this game? ',
    //                     choices: [ 1, 2, 3 ],
    //                     correctChoice: 1
    //                 },
    //                 {
    //                     name: 'ChoiceTable',
    //                     id: 'coins',
    //                     mainText: 'How many coins do you divide each round?',
    //                     choices: [
    //                         settings.COINS,
    //                         settings.COINS + 100,
    //                         settings.COINS + 25,
    //                         'Not known'
    //                     ],
    //                     correctChoice: 0
    //                 }
    //             ],
    //             formsOptions: {
    //                 shuffleChoices: true
    //             }
    //         }
    //     },
    //     exit: function() {
    //         node.game.visualTimer.show();
    //     },
    // });

    // stager.extendStep('game', {
    //     frame: 'game.html',
    //     roles: {
    //         DICTATOR: {
    //             timer: settings.bidTime,
    //             cb: function() {
    //                 var div;

    //                 // Make the dictator display visible and returns it.
    //                 div = W.show('dictator');

    //                 // Add widget to validate numeric input.
    //                 node.game.bid = node.widgets.append('CustomInput', div, {
    //                     type: 'int',
    //                     min: 0,
    //                     max: node.game.settings.COINS,
    //                     requiredChoice: true,
    //                     mainText: 'Make an offer between 0 and ' +
    //                         node.game.settings.COINS + ' to another player'
    //                 });
    //             },
    //             done: function() {
    //                 return { offer: node.game.bid.getValues().value };
    //             },
    //             timeup: function() {
    //                 node.game.bid.setValues();
    //                 node.done();
    //             }
    //         },
    //         OBSERVER: {
    //             donebutton: false,
    //             cb: function() {
    //                 var dotsObj;

    //                 // Make the observer display visible.
    //                 W.show('observer');

    //                 dotsObj = W.addLoadingDots(W.gid('dots'));

    //                 node.on.data('decision', function(msg) {
    //                     node.game.doneButton.enable();
    //                     dotsObj.stop();
    //                     W.setInnerHTML('waitingFor', 'Decision arrived: ');
    //                     W.setInnerHTML('decision',
    //                                    'The dictator offered: ' +
    //                                    msg.data + ' ECU.');

    //                     // Leave the decision visible for up 5 seconds.
    //                     // If user clicks Done, it can advance faster.
    //                     node.timer.wait(5000).done();
    //                 });
    //             }
    //         }
    //     }
    // });



    stager.extendStep('end', {
        init: function () {
            // node.game.doneButton.destroy();
            node.game.visualTimer.destroy();
        },

        widget: {
            name: 'EndScreen',
            options: { showEmailForm: false },
        },


    });
};
