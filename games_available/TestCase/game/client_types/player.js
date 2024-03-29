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

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    stager.setOnInit(function() {

        // Initialize the client.

        var header;

        // Setup page: header + frame.
        header = W.generateHeader();
        W.generateFrame();

        // Add widgets.
        this.visuaStage = node.widgets.append('VisualStage', header);
        this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header);
        this.doneButton = node.widgets.append('DoneButton', header);

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('instructions', {
        frame: 'instructions.htm',
        cb: function() {
            // Note: we need to specify node.game.settings,
            // and not simply settings, because this code is
            // executed on the client.
            var s = node.game.settings;
            // Replace variables in the instructions.
            W.setInnerHTML('coins', s.COINS);
            W.setInnerHTML('rounds', s.ROUNDS);
            W.setInnerHTML('exchange-rate', (s.COINS * s.EXCHANGE_RATE));
        }
    });

    stager.extendStep('quiz', {
        init: function() {
            node.game.visualTimer.hide();
        },
        cb: function() {
            // Modify CSS rules on the fly.
            W.cssRule('.choicetable-left, .choicetable-right ' +
                      '{ width: 200px !important; }');

            W.cssRule('table.choicetable td { text-align: left !important; ' +
                      'font-weight: normal; padding-left: 10px; }');
        },

        // Make a widget step.
        widget: {
            name: 'ChoiceManager',
            id: 'quiz',
            options: {
                mainText: 'Answer the following questions to check ' +
                          'your understanding of the game.',
                forms: [
                    {
                        name: 'ChoiceTable',
                        id: 'howmany',
                        mainText: 'How many players are there in this game? ',
                        choices: [ 1, 2, 3 ],
                        correctChoice: 1
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'coins',
                        mainText: 'How many coins do you divide each round?',
                        choices: [
                            settings.COINS,
                            settings.COINS + 100,
                            settings.COINS + 25,
                            'Not known'
                        ],
                        correctChoice: 0
                    }
                ],
                formsOptions: {
                    shuffleChoices: true
                }
            }
        },
        exit: function() {
            node.game.visualTimer.show();
        },
    });

    stager.extendStep('game', {
        frame: 'game.htm',
        roles: {
            DICTATOR: {
                timer: settings.bidTime,
                cb: function() {
                    var div;

                    // Make the dictator display visible and returns it.
                    div = W.show('dictator');

                    // Add widget to validate numeric input.
                    node.game.bid = node.widgets.append('CustomInput', div, {
                        type: 'int',
                        min: 0,
                        max: node.game.settings.COINS,
                        requiredChoice: true,
                        mainText: 'Make an offer between 0 and ' +
                            node.game.settings.COINS + ' to another player'
                    });
                },
                done: function() {
                    return { offer: node.game.bid.getValues().value };
                },
                timeup: function() {
                    node.game.bid.setValues();
                    node.done();
                }
            },
            OBSERVER: {
                donebutton: false,
                cb: function() {
                    var dotsObj;

                    // Make the observer display visible.
                    W.show('observer');

                    dotsObj = W.addLoadingDots(W.gid('dots'));

                    node.on.data('decision', function(msg) {
                        node.game.doneButton.enable();
                        dotsObj.stop();
                        W.setInnerHTML('waitingFor', 'Decision arrived: ');
                        W.setInnerHTML('decision',
                                       'The dictator offered: ' +
                                       msg.data + ' ECU.');

                        // Leave the decision visible for up 5 seconds.
                        // If user clicks Done, it can advance faster.
                        node.timer.wait(5000).done();
                    });
                }
            }
        }
    });

    stager.extendStep('end', {
        widget: 'EndScreen',
        init: function() {
            node.game.doneButton.destroy();
            node.game.visualTimer.destroy();
        }
    });
};
