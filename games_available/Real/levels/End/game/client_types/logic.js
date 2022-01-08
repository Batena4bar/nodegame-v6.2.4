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
  let channel = gameRoom.channel;
  let memory = node.game.memory;

  stager.extendStep('end_of_game', {
    init: function () {

      // Feedback.
      memory.view('feedback').save('feedback.csv', {
        header: ['timestamp', 'player', 'feedback'],
        keepUpdated: true
      });

      // Email.
      memory.view('email').save('email.csv', {
        header: ['timestamp', 'player', 'email'],
        keepUpdated: true
      });

      // Loop through all connected players.
      Object.keys(node.game.memory.player).forEach(function(playerId) {
        // gameRoom.updateWin(player.id, reward);
        var client = channel.registry.getClient(playerId);
        var reward = client.reward;
        console.log('player', playerId, 'client', client, 'reward', reward);
        gameRoom.updateWin(playerId, reward); 
      });

      // node.game.pl.each(function (player) {
      //   var client = channel.registry.getClient(player.id);
      //   var reward = client.reward;
      //   // console.log('player', player.id, 'client', client, 'reward', reward);
      //   gameRoom.updateWin(player.id, reward); 
      // });     
    },
    cb: function () {
      gameRoom.computeBonus();
    }
  });

  // Must implement the stages here.
  stager.setOnGameOver(function () {
    memory.save('data.json');

    // node.game.pl.each(function (player) {
    //   console.log('Saving data for', player.id);
    //   memory.player[player.id].save('data_player_' + player.id + '.json');
    // });
  });
};
