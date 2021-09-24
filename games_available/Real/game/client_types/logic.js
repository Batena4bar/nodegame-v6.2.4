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
  // let memory = node.game.memory;

  // Must implement the stages here.

  stager.setOnInit(function () {
    node.on.data('LEVEL_DONE', function (msg) {
      channel.registry.updateClient(msg.from, { startRoomName: gameRoom.name });

      var levelName = 'Task';
      // var levelName = 'Pilot';

      setTimeout(function () {
        console.log('moving client to next level: ', msg.from);
        channel.moveClientToGameLevel(msg.from, levelName, gameRoom.name);
      }, 100);
    });



    node.on.data('SAVE_DATA', function (msg) {
      // console.log('SAVE_DATA', msg);
      channel.registry.updateClient(msg.from, msg.data);
      channel.registry.updateClient(msg.from, { stage: msg.stage });
    });
  });


  // Extends Stages and Steps where needed.

  // stager.extendStep('info_and_consent_1', {
  //   cb: function () {
  //     console.log('info_and_consent_1 logic');
  //   },
  //   // exit: function () {
  //   //   memory.save('data.json')
  //   // },
  // });

  // stager.extendStep('instructions_video', {
  //   cb: function () {
  //     console.log('instructions_video');
  //   },
  //   // exit: function () {
  //   //   console.log('Saving all data');
  //   //   memory.save('data.json');
  //   // },
  // });

};
