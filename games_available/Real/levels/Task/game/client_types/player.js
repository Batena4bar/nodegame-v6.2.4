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
        sliderValues: [0, 0, 0],
        likertTableValues: null,
        chatWidget: null
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

        this.uuidv4 = function () {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }

        function setUpInfoBar(showMessageButton) {
            // Construct infoBar
            var infoBar = W.getElementById('info-bar');
            var infoBarWidget = node.widgets.append('InfoBar', infoBar, {
                data: node.game.infoData,
                messageButton: showMessageButton,
                // Extra options available to all widgets.
                docked: false,
                collapsible: false,
                closable: false
            });
            infoBarWidget.removeFrame();
        }

        this.setUpReconnectableInfoBar = function (showMessageButton) {
            if (node.game.infoData) {
                setUpInfoBar(showMessageButton);
            } else {
                node.on.data('RESENT_DATA', function (msg) {
                    node.game.infoData = msg.data;
                    setUpInfoBar(showMessageButton);
                });
                node.say('RESEND_INFODATA', node.player.id);
            }
        }

        function setUpChat(hideSendBox) {
            // Construct chat
            var chat = W.getElementById('chat');
            node.game.globals.chatWidget = node.widgets.append('Chat', chat, {
                participants: node.game.chatPartners,
                title: 'Chat',
                chatEvent: 'CHAT',
                printStartTime: false,
                storeMsgs: true,
                receiverOnly: hideSendBox,
                docked: false,
                collapsible: false,
                closable: false
            });
        }

        this.setUpReconnectableChat = function (hideSendBox, action) {
            if (node.game.chatPartners) {
                console.log('rc A');
                setUpChat(hideSendBox);
                if (action) {
                    action();
                }
            } else {
                console.log('rc B');
                node.on('PLAYERS_LOADED', function (msg) {
                    console.log('rc PLAYERS_LOADED', action);
                    setUpChat(hideSendBox);
                    if (action) {
                        action();
                    }
                });
                node.say('RESEND_PLAYERS', node.player.id);
            }
        }

        function setUpPlayers(msg) {
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

            console.log('emitted PLAYERS_LOADED', msg);
            node.emit('PLAYERS_LOADED', msg);
        }

        node.on.data('PLAYERS', setUpPlayers);

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
        //this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header);
        // this.disconnectBox = node.widgets.append('DisconnectBox', header, {
        //     showDiscBtn: true,
        //     showStatus: true,
        //     connectCb: function () {
        //         alert('Hey you connected!');
        //     }
        // });

        this.visualRound = node.widgets.append('VisualRound', header, {
            displayModeNames: [
                'COUNT_UP_STAGES_TO_TOTAL',
                'COUNT_UP_ROUNDS'
            ],
            // preprocess: function(info) {
            //     if (node.game.isStage('tutorial')) {
            //         info.totStep--;
            //         info.totRound-- 1;
            //         info.totStep: 2;
            //         info.totStage: 5;
            //         info.curStep: 1;
            //         info.curStage: 1;
            //         info.curRound: 1;
            //     }
            // }
        });

        // this.doneButton = node.widgets.append('DoneButton', header);

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    // The Task

    stager.extendStep('task_start', {
        frame: 'task_start.html',
        //////////////////////////////////////
        //done: function (data) { 
        //    node.say('LEVEL_DONE');
        //},
        //////////////////////////////////////
        cb: function () {
            this.doneButton = this.addDoneButton('Start Task');
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
                if (event.target.value.length < 10) {
                    that.doneButton.disable();
                } else {
                    that.doneButton.enable();
                }
            });
        }
    });

    // stager.extendStep('the_scenario_3', {
    //     frame: settings.treatment_3,
    //     cb: function () {
    //         this.doneButton = this.addDoneButton('Continue');
    //     },
    // });

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
            this.setUpReconnectableInfoBar(false);

            // Construct linkedSliders
            var linkedSliders = W.getElementById('linked-sliders');
            var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                labels: ['Sam', 'Alex', 'Jamie']
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
        // init: function () {
        //     node.game.visualTimer.hide();
        // },
        donebutton: {
            text: 'Finish Chatting',
            enableOnPlaying: false,
        },
        done: function () {
            node.game.globals.chatWidget.sendMsg({
                infoId: 'LEFT_CHAT',
                id: this.uuidv4,
                senderAlias: node.player.name,
                msg: '<div><strong>Left chat</strong></div>'
            });
        },
        cb: function () {
            var that = this;

            var currentData;
            var judge = W.getElementById('judge');
            switch (node.game.settings.treatmentName) {
                case 'external_evaluation':
                    judge.src = 'imgs/boss.jpg';
                    break;
                case 'internal_evaluation':
                    judge.src = 'imgs/colleagues2.png';
                    break;
                default:
                    judge.src = 'imgs/Neutral.jpg';
                    break;
            }
            var topic = W.getElementById('topic');
            var justification = W.getElementById('justification');

            this.setUpReconnectableInfoBar(true);

            // Receive data from infoBar
            node.on('BUBBLE_DATA', function (data, index) {
                console.log('BUBBLE_DATA', data, index);
                currentData = data;
                topic.value = currentData.topic;
            });

            this.setUpReconnectableChat(true);

            var sentMessage = false;
            var pauseElapsed = false;

            function activateDoneButton() {
                if (sentMessage && pauseElapsed) {
                    doneButton.disabled = false;
                }
            }

            setTimeout(function () {
                pauseElapsed = true;
                activateDoneButton();
            }, 240000);

            // Attach functionality to chat input form
            var propostionMap = {
                '<': 'preferable to',
                '>': 'less preferable than'
            };
            var commodity1 = W.getElementById('commodity_1');
            var proposition = W.getElementById('proposition');
            var commodity2 = W.getElementById('commodity_2');
            var button = W.getElementById('send');
            button.onclick = function () {
                if (messageComplete()) {
                    node.game.globals.chatWidget.sendMsg({
                        infoId: currentData.id,
                        id: that.uuidv4(), // Math.trunc(Math.random() * 10000),
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
                    topic.value = '';
                    commodity1.value = proposition.value = commodity2.value = '';
                    justification.value = '';
                    sentMessage = true;
                    activateDoneButton();
                } else {
                    alert('Please complete all message fields');
                }
            };
            var messageComplete = function () {
                return topic.value && commodity1.value && proposition.value && commodity2.value && justification.value;
            }

            // Construct done button
            var doneButton = W.getElementById('donebutton');
            doneButton.addEventListener('click', function () {
                if (confirm('Are you sure you want to leave the chat?')) {
                    node.done();
                }
            });

            // Alert
            var popUp = W.getElementById('popUp');
            var popUpClose = W.getElementById('popUpClose');
            popUpClose.addEventListener('click', function () {
                popUp.remove();
            });
        },
    });

    stager.extendStep('message_like', {
        frame: 'message_like.html',
        // init: function () {
        //     node.game.visualTimer.hide();
        // },
        donebutton: {
            text: 'Submit Likes',
            enableOnPlaying: false,
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
            var that = this;
            var judge = W.getElementById('judge');
            switch (node.game.settings.treatmentName) {
                case 'external_evaluation':
                    judge.src = 'imgs/boss.jpg';
                    break;
                case 'internal_evaluation':
                    judge.src = 'imgs/colleagues2.png';
                    break;
                default:
                    judge.src = 'imgs/Neutral.jpg';
                    break;
            }

            this.setUpReconnectableInfoBar(false);

            if (!node.game.players) {
                console.log('RESEND_PLAYERS', node.player.id);
                node.say('RESEND_PLAYERS', node.player.id);
            }

            var likeCount = 0;

            // Construct messages
            var messages = W.getElementById('messages');
            // Receive data from logic
            node.on.data('CHATMESSAGES', function (msg) {
                console.log('Recieved CHATMESSAGES', msg.data);
                msg.data.forEach(function (message) {
                    var chatMessage = document.createElement('div');
                    chatMessage.classList.add('chat_msg');
                    var senderName = message.player !== node.player.id ? node.game.players[message.player] : null;
                    var messageContent = document.createElement('div');
                    messageContent.classList.add('message-content');
                    messageContent.innerHTML = (senderName ? `<span class="chat_id_other">${senderName}</span>: ` : '') + message.chatMessage.msg;
                    chatMessage.appendChild(messageContent);

                    if (node.player.id === message.player) {
                        chatMessage.classList.add('chat_msg_outgoing');
                    } else {
                        chatMessage.classList.add('chat_msg_incoming');

                        if (message.chatMessage.infoId !== 'LEFT_CHAT') {
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
                                    likeCount++;
                                } else {
                                    element.classList.remove('fas');
                                    element.classList.add('far');
                                    likeCount--;
                                }
                                if (likeCount === 0) {
                                    that.doneButton.disable();
                                } else {
                                    that.doneButton.enable();
                                }
                            });
                        }
                    }

                    messages.appendChild(chatMessage);
                });
            });

            node.on('PLAYERS_LOADED', function (msg) {
                console.log('RESEND_CHATMESSAGES', node.player.id)
                node.say('RESEND_CHATMESSAGES');
            });

            // Construct done button
            var continueButton = W.getElementById('continue');
            this.doneButton = node.widgets.append('DoneButton', continueButton);
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
            node.say('GROUP_CHOICE', 'SERVER', node.game.globals.sliderValues);
        },
        cb: function () {
            var judge = W.getElementById('judge');
            switch (node.game.settings.treatmentName) {
                case 'external_evaluation':
                    judge.src = 'imgs/boss.jpg';
                    break;
                case 'internal_evaluation':
                    judge.src = 'imgs/colleagues2.png';
                    break;
                default:
                    judge.src = 'imgs/Neutral.jpg';
                    break;
            }
            this.setUpReconnectableInfoBar(false);

            // Construct linkedSliders
            var linkedSliders = W.getElementById('linked-sliders');
            var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                labels: ['Sam', 'Alex', 'Jamie']
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
            text: 'Accept Decision',
            enableOnPlaying: false,
        },
        done: function () {
            if (!node.game.globals.deciderId) {
                // This player decided, tell the others
                node.game.partners.forEach(function (participantId) {
                    node.say('DECISION_ACCEPTED', participantId);
                });
            }
            console.log('accepted_decision', node.game.globals.sliderValues, node.game.globals.deciderId || node.player.id);
            node.set({ value: { group_choice: node.game.globals.sliderValues, decider: node.game.globals.deciderId || node.player.id } });
            //////////////////////////////////////
            node.say('LEVEL_DONE');
            //////////////////////////////////////
        },
        cb: function () {
            var choices = {};
            var that = this;
            var judge = W.getElementById('judge');
            switch (node.game.settings.treatmentName) {
                case 'external_evaluation':
                    judge.src = 'imgs/boss.jpg';
                    break;
                case 'internal_evaluation':
                    judge.src = 'imgs/colleagues2.png';
                    break;
                default:
                    judge.src = 'imgs/Neutral.jpg';
                    break;
            }

            node.on.data('DECISION_ACCEPTED', function (msg) {
                node.game.globals.deciderId = msg.from;
                var deciderName = node.game.players[node.game.globals.deciderId];
                alert(`${deciderName} has accepted the decision on behalf of the group. Close this message to continue.`);
                node.done();
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
                var participantIds = Object.keys(choices);
                // console.log('checkChoicesMatch', choices);

                if (participantIds.length === 3) {
                    var agree = false;
                    for (var i = 0; i < 3; i++) {
                        var value = 0;
                        for (var j = 0; j < 3; j++) {
                            var participantId = participantIds[j];
                            if (j === 0) {
                                value = choices[participantId][i];
                            } else if (choices[participantId][i] === value) {
                                agree = true;
                            } else {
                                agree = false;
                                break;
                            }
                        }
                        if (!agree) {
                            that.doneButton.disable();
                            return;
                        }
                    }
                    that.doneButton.enable();
                }
            }

            function loadChoicesThenSliders() {
                // console.log('loadChoicesThenSliders');
                node.on.data('GROUP_CHOICE', function (msg) {
                    // console.log('Recieved GROUP_CHOICE', msg.data);
                    choices = msg.data;
                    setUpLinkedSliders();
                });
                node.say('RESEND_GROUP_CHOICE');
            }

            function setUpLinkedSliders() {
                // console.log('setUpLinkedSliders');
                var linkedSliders = W.getElementById('linked-sliders');
                var linkedSlidersWidget = node.widgets.append('LinkedSliders', linkedSliders, {
                    labels: ['Sam', 'Alex', 'Jamie'],
                    participants: node.game.chatPartners,
                    ownId: node.player.id,
                    choices: choices,
                });
                linkedSlidersWidget.removeFrame();

                node.on.data('CHOICES', function (msg) {
                    choices[msg.from] = msg.data;
                    linkedSlidersWidget.setOtherChoices(choices);
                    checkChoicesMatch();
                });

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
                submitChoiceButton.addEventListener('click', function () {
                    //console.log('submitChoice');
                    var suggestion = linkedSlidersWidget.getValues();
                    if (!arraysEqual(suggestion, lastSuggestion)) {
                        choices[node.player.id] = suggestion;
                        // Send suggestion to other players
                        node.game.partners.forEach(function (participantId) {
                            console.log('Sending Choice');
                            node.say('CHOICES', participantId, suggestion);
                        });
                        // Send suggestion to server
                        node.say('GROUP_CHOICE', 'SERVER', suggestion);
                        node.game.globals.chatWidget.sendMsg({
                            suggestion: suggestion,
                            msg: function (data, code) {
                                if (code === 'incoming') {
                                    //
                                } else if (code === 'outgoing') {
                                    return '<div><strong>Suggested</strong></div><div>Sam: ' +
                                        data.suggestion[0] + '; Alex: ' +
                                        data.suggestion[1] + '; Jamie: ' +
                                        data.suggestion[2] + '</div>';
                                }
                            }
                        });
                        checkChoicesMatch();
                        lastSuggestion = suggestion;
                    }
                });

                checkChoicesMatch();
                node.game.globals.sliderValues = linkedSlidersWidget.getValues();
            }

            console.log('node.game.chatPartners', node.game.chatPartners);

            this.setUpReconnectableChat(false, loadChoicesThenSliders);

            // Construct done button
            var continueButton = W.getElementById('continue');
            this.doneButton = node.widgets.append('DoneButton', continueButton);
            this.doneButton.removeFrame();
            this.doneButton.disable();
        },
    });

    stager.extendStep('intra_task_2', {
        frame: 'post_task_2.html',
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

    stager.extendStep('intra_task_1', {
        frame: 'post_task_1.html',
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
