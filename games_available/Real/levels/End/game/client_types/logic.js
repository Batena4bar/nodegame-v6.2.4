/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2021 Sam Bateman <samuel.bateman@icloud.com>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

'use strict';

module.exports = function (treatmentName, settings, stager, setup, gameRoom) {

  let node = gameRoom.node;
  let memory = node.game.memory;

  // Must implement the stages here.
  stager.setOnGameOver(function () {
    memory.save('data.json');

    node.game.pl.each(function (player) {
      console.log('Saving data for', player.id);
      memory.player[player.id].save('data_player_' + player.id + '.json');
    });
  });
};
