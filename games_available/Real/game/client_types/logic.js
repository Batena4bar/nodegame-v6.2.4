/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2021 Sam Bateman <samuel.bateman@icloud.com>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

'use strict';


const ngc = require('nodegame-client');
const J = ngc.JSUS;

module.exports = function (treatmentName, settings, stager, setup, gameRoom) {

  let node = gameRoom.node;
  let channel = gameRoom.channel;
  let memory = node.game.memory;

  // Must implement the stages here.

  stager.setOnInit(function () {
    node.on.data('LEVEL_DONE', function (msg) {
      var levelName = 'Task';
      // Move client to the next level.
      // (async so that it finishes all current step operations).
      setTimeout(function () {
        console.log('moving client to next level: ', msg.from);
        channel.moveClientToGameLevel(msg.from, levelName, gameRoom.name);
      }, 100);
    });
  });


  // Extends Stages and Steps where needed.

  stager.extendStep('info_and_consent_1', {
    cb: function () {
      console.log('info_and_consent_1 logic');
    },
    exit: function () {
      memory.save('data.json')
    },
  });

  stager.extendStep('instructions_video', {
    exit: function () {
      console.log('Saving all data');
      memory.save('data.json');
    },
  });

};
