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
        //tabData: ['dummy'],
        attentionCheck: null,
        sliderValues: [0, 0, 0],
        likertTableValues: null,
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
        this.visualTimer = node.widgets.append('VisualTimer', header);
        this.disconnectBox = node.widgets.append('DisconnectBox', header, {
            showDiscBtn: false,
            showStatus: true,
            connectCb: function () {
                alert('Hey you connected!');
            }
        });
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
                node.set({ value: { comprehension_1: answer } });
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
                node.set({ value: { comprehension_2: commodities } });
            };
            step2.style = "display: none;"
        },
    });

    stager.extendStep('instructions_video', {
        frame: 'video.html',
        init: function () {
            node.game.visualTimer.hide();
        },
        done: function (data) {
            // console.log('attention_check', node.game.globals.attentionCheck);
            node.set({ value: { attention_check: node.game.globals.attentionCheck } });
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
        donebutton: {
            text: 'Continue',
            enableOnPlaying: false,
        },
        done: function (data) {
            var justification = W.getElementById('justification');
            if (justification && justification.value) {
                node.set({ value: { justification: justification.value } });
            }
        },
        cb: function () {
            var that = this;

            var justification = W.getElementById('justification');
            this.doneButton = node.widgets.append('DoneButton', W.getElementById('done-button'), {
                text: 'Continue',
                enableOnPlaying: false
            });
            this.doneButton.removeFrame();
            this.doneButton.disable();
            
            justification.addEventListener('keydown', function (event) {
                if (event.target.value.length < 120) {
                    that.doneButton.disable();
                } else {
                    that.doneButton.enable();
                }
            });
        }
    });

    stager.extendStep('the_scenario_3', {
        frame: settings.treatment_3,
        cb: function () {
            this.doneButton = this.addDoneButton('Continue');
        },
    });

    // The Task

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
        done: function (data) {
            // console.log('initial_choice', node.game.globals.sliderValues);
            node.set({ value: { initial_choice: node.game.globals.sliderValues } });
        },
        cb: function () {
            // Construct infoBar
            var infoBar = W.getElementById('info-bar');
            var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                data: node.game.infoData,
                // Extra options available to all widgets.
                docked: false,
                collapsible: false,
                closable: false
            });
            infoBarWidget.removeFrame();

            // Construct linkedSliders
            var linkedSliders = W.getElementById('linked-sliders');
            var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                labels: ['Wheat', 'Sugar', 'Coffee']
            });
            linkedSlidersWidget.removeFrame();
            node.on('complete', function () {
                node.game.globals.sliderValues = linkedSlidersWidget.getValues();
                // console.log('initial_choice ->', node.game.globals.sliderValues);
                this.doneButton.enable();
            });

            // Construct done button
            node.on('incomplete', function () {
                this.doneButton.disable();
            });
            this.doneButton = node.widgets.append('DoneButton', linkedSliders);
            this.doneButton.removeFrame();
            this.doneButton.disable();
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

            // Construct infoBar
            var infoBar = W.getElementById('info-bar');
            var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                data: node.game.infoData,
                messageButton: true,
                // Extra options available to all widgets.
                docked: false,
                collapsible: false,
                closable: false
            });
            infoBarWidget.removeFrame();

            // Receive data from infoBar
            node.on('BUBBLE_DATA', function (data, index) {
                console.log('BUBBLE_DATA', data, index);
                currentData = data;
                topic.innerText = currentData.topic;
            });

            // Construct chat
            var chat = W.getElementById('chat');
            var chatWidget = node.widgets.append('Chat', chat, {
                participants: node.game.chatPartners,
                title: 'Chat',
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
                        senderAlias: node.player.name,
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

    stager.extendStep('message_like', {
        frame: 'message_like.html',
        init: function () {
            node.game.visualTimer.hide();
        },
        done: function (data) {
            var messages = W.getElementById('messages');
            var likes = messages.querySelectorAll('.fa-thumbs-up.fas')
            var likesList = [];
            Array.prototype.forEach.call(likes, function (like) {
                likesList.push(like.id);
            });
            console.log('likes', likesList);
            node.set({ value: { likes: likesList } });
        },
        cb: function () {
            // Construct infoBar
            var infoBar = W.getElementById('info-bar');
            var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                data: node.game.infoData,
                // Extra options available to all widgets.
                docked: false,
                collapsible: false,
                closable: false
            });
            infoBarWidget.removeFrame();

            // Construct messages
            var messages = W.getElementById('messages');
            // Receive data from logic
            node.on.data('CHATMESSAGES', function (msg) {
                console.log('Recieved CHATMESSAGES', msg.data);
                msg.data.forEach(function (message) {
                    var chatMessage = document.createElement('div');
                    chatMessage.classList.add('chat-message');
                    var messageContent = document.createElement('div');
                    messageContent.classList.add('message-content');
                    messageContent.innerHTML = message.chatMessage.msg;
                    chatMessage.appendChild(messageContent);

                    if (node.player.id === message.player) {
                        chatMessage.classList.add('own-message');
                    } else {
                        var thumbsUp = document.createElement('div');
                        thumbsUp.classList.add('thumbs-up');

                        thumbsUp.innerHTML = '<span class="far fa-thumbs-up fa-2x"></span>';
                        chatMessage.appendChild(thumbsUp);

                        var thumbsUpIcon = thumbsUp.getElementsByClassName('fa-thumbs-up').item(0);

                        var att = document.createAttribute('id');
                        att.value = message.chatMessage.id;
                        thumbsUpIcon.setAttributeNode(att);

                        thumbsUpIcon.addEventListener('click', function (event) {
                            var element = event.target;
                            if (element.classList.contains('far')) {
                                element.classList.remove('far');
                                element.classList.add('fas');
                            } else {
                                element.classList.remove('fas');
                                element.classList.add('far');
                            }
                        });
                    }

                    messages.appendChild(chatMessage);
                });
            });

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
        done: function (data) {
            console.log('secondary_choice', node.game.globals.sliderValues);
            node.set({ value: { secondary_choice: node.game.globals.sliderValues } });
        },
        cb: function () {
            // Construct infoBar
            var infoBar = W.getElementById('info-bar');
            var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                data: node.game.infoData,
                // Extra options available to all widgets.
                docked: false,
                collapsible: false,
                closable: false
            });
            infoBarWidget.removeFrame();

            // Construct linkedSliders
            var linkedSliders = W.getElementById('linked-sliders');
            var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                labels: ['Wheat', 'Sugar', 'Coffee']
            });
            linkedSlidersWidget.removeFrame();
            node.on('complete', function () {
                node.game.globals.sliderValues = linkedSlidersWidget.getValues();
                console.log('secondary_choice ->', node.game.globals.sliderValues);
                this.doneButton.enable();
            });
            // Construct done button
            node.on('incomplete', function () {
                this.doneButton.disable();
            });
            this.doneButton = node.widgets.append('DoneButton', linkedSliders);
            this.doneButton.removeFrame();
            this.doneButton.disable();
        },
    });

    stager.extendStep('group_choice', {
        frame: 'group_choice.html',
        donebutton: {
            text: 'Accept Descision',
            enableOnPlaying: false,
        },
        done: function (data) {
            console.log('accepted_decision', node.game.globals.sliderValues);
            node.set({ value: { group_choice: node.game.globals.sliderValues } });
        },
        cb: function () {
            var choices = {};
            var that = this;

            node.on.data('CHOICES', function (msg) {
                choices[msg.from] = msg.data;
                checkChoicesMatch();
            });

            function arraysEqual(a, b) {
                if (a === b) return true;
                if (a == null || b == null) return false;
                if (a.length !== b.length) return false;

                for (var i = 0; i < a.length; ++i) {
                    if (a[i] !== b[i]) return false;
                }
                return true;
            }

            function checkChoicesMatch() {
                var keys = Object.keys(choices);
                if (keys.length < 3) {
                    return false;
                }
                if ((choices[keys[0]][0] === choices[keys[1]][0]) && (choices[keys[1]][0] === choices[keys[2]][0]) &&
                    (choices[keys[0]][1] === choices[keys[1]][1]) && (choices[keys[1]][1] === choices[keys[2]][1]) &&
                    (choices[keys[0]][2] === choices[keys[1]][1]) && (choices[keys[1]][1] === choices[keys[2]][2])) {
                    that.doneButton.enable();
                } else {
                    that.doneButton.disable();
                }
            }

            // Construct chat
            var chat = W.getElementById('chat');
            var chatWidget = node.widgets.append('Chat', chat, {
                participants: node.game.chatPartners,
                title: 'Chat',
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
                node.game.globals.sliderValues = linkedSlidersWidget.getValues();
                console.log('accepted_decision ->', node.game.globals.sliderValues);
                submitChoiceButton.disabled = false;
            });
            // Construct done button
            node.on('incomplete', function () {
                submitChoiceButton.disabled = true;
            });
            var submitChoiceButton = W.getElementById('send');
            var lastSuggestion = [];
            submitChoiceButton.addEventListener('click', function (event) {
                //console.log('submitChoice');
                var suggestion = linkedSlidersWidget.getValues();
                if (!arraysEqual(suggestion, lastSuggestion)) {
                    choices[node.player.id] = suggestion;
                    node.game.partners.forEach(function (participantId) {
                        node.say('CHOICES', participantId, suggestion);
                    });
                    //console.log('choices', choices);
                    chatWidget.sendMsg({
                        suggestion: suggestion,
                        msg: function (data, code) {
                            if (code === 'incoming') {
                                //
                            } else if (code === 'outgoing') {
                                return '<div><strong>Suggested</strong></div><div>Wheat: ' +
                                    data.suggestion[0] + '; Sugar: ' +
                                    data.suggestion[1] + '; Coffee: ' +
                                    data.suggestion[2] + '</div>';
                            }
                        }
                    });
                    checkChoicesMatch();
                    lastSuggestion = suggestion;
                }
            });

            // Construct done button
            var continueButton = W.getElementById('continue');
            this.doneButton = node.widgets.append('DoneButton', continueButton);
            this.doneButton.removeFrame();
            this.doneButton.disable();
        },
    });

    stager.extendStep('post_task_1', {
        frame: 'post_task_1.html',
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

    stager.extendStep('post_task_2', {
        frame: 'post_task_2.html',
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
