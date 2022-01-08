/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2021 Sam Bateman <samuel.bateman@icloud.com>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

'use strict';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const ngc = require('nodegame-client');
const player = require('./player');
const J = ngc.JSUS;
const tabData = [
  {
    id: 'AX1',
    icon: 'S<sub>1</sub>',
    topic: 'Conflict Resolution',
    html:
      `<p> Sam is good at resolving conflict</p>`
  },
  {
    id: 'AX2',
    icon: 'S<sub>2</sub>',
    topic: 'Work Abroad',
    html:
    `<p> Sam has previously been working abroad in the US</p>`
  },
  {
    id: 'AX3',
    icon: 'S<sub>3</sub>',
    topic: 'Age',
    html:
    `<p> Sam is 33 years old</p>`
  },
  {
    id: 'AX4',
    icon: 'S<sub>4</sub>',
    topic: 'Qualification',
    html:
    `<p> Sam has done a bachelors degree</p>`
  },
  {
    id: 'AX5',
    icon: 'S<sub>5</sub>',
    topic: 'Attitude',
    html:
    `<p> Sam can often be rude</p>`
  },
  {
    id: 'AY1',
    icon: 'A<sub>1</sub>',
    topic: 'Constructive Nature',
    html:
    `<p> Alex tends to take criticism well</p>`
  },
  {
    id: 'AY2',
    icon: 'A<sub>2</sub>',
    topic: 'Respect',
    html:
    `<p> Alex treats others with respect</p>`
  },
  {
    id: 'AY3',
    icon: 'A<sub>3</sub>',
    topic: 'Knowledge',
    html:
    `<p> Alex is knowledgeable about the newest developments within management technologies</p>`
  },
  {
    id: 'AY4',
    icon: 'A<sub>4</sub>',
    topic: 'Resentment',
    html:
    `<p> Alex has been known to hold grudges against colleagues</p>`
  },
  {
    id: 'AY5',
    icon: 'A<sub>5</sub>',
    topic: 'Reliability',
    html:
    `<p> Alex is a reliable employee</p>`
  },
  {
    id: 'AZ1',
    icon: 'J<sub>1</sub>',
    topic: 'Creativity',
    html:
    `<p> Jamie has poor creativity when coming up with new ideas</p>`
  },
  {
    id: 'AZ2',
    icon: 'J<sub>2</sub>',
    topic: 'Consistency',
    html:
    `<p> Jamie is often not consistent in the way they carry out procedures within the workplace</p>`
  },
  {
    id: 'AZ3',
    icon: 'J<sub>3</sub>',
    topic: 'Nationality',
    html:
    `<p> Jamie was born in Austria</p>`
  },
  {
    id: 'AZ4',
    icon: 'J<sub>4</sub>',
    topic: 'Hobbies',
    html:
    `<p> Jamie likes to play snooker</p>`
  },
  {
    id: 'AZ5',
    icon: 'J<sub>5</sub>',
    topic: 'Sharpness',
    html:
    `<p> Jamie is very quick to understand what needs to be done</p>`
  },
  {
    id: 'BX1',
    icon: 'S<sub>1</sub>',
    topic: 'Knowledge',
    html:
    `<p> Sam is well informed about how charities operate</p>`
  },
  {
    id: 'BX2',
    icon: 'S<sub>2</sub>',
    topic: 'Pressure',
    html:
    `<p> Sam works well under pressure</p>`
  },
  {
    id: 'BX3',
    icon: 'S<sub>3</sub>',
    topic: 'Nationality',
    html:
    `<p> Sam is from the UK</p>`
  },
  {
    id: 'BX4',
    icon: 'S<sub>4</sub>',
    topic: 'Parent',
    html:
    `<p> Sam has two children</p>`
  },
  {
    id: 'BX5',
    icon: 'S<sub>5</sub>',
    topic: 'Coping Style',
    html:
    `<p> Sam only does what needs to be done</p>`
  },
  {
    id: 'BY1',
    icon: 'A<sub>1</sub>',
    topic: 'Childhood',
    html:
    `<p> Alex grew up in a city close to the charity’s headquarters</p>`
  },
  {
    id: 'BY2',
    icon: 'A<sub>2</sub>',
    topic: 'Attitude',
    html:
    `<p> Alex can get very stressed</p>`
  },
  {
    id: 'BY3',
    icon: 'A<sub>3</sub>',
    topic: 'Work Experience',
    html:
    `<p> Alex has previously worked for a taxi company</p>`
  },
  {
    id: 'BY4',
    icon: 'A<sub>4</sub>',
    topic: 'Popularity',
    html:
    `<p> Alex is already popular with the other employees</p>`
  },
  {
    id: 'BY5',
    icon: 'A<sub>5</sub>',
    topic: 'Sharpness',
    html:
    `<p> Alex is slow at learning new information</p>`
  },
  {
    id: 'BZ1',
    icon: 'J<sub>1</sub>',
    topic: 'Resolving Conflict',
    html:
    `<p> Jamie is not good at managing conflict</p>`
  },
  {
    id: 'BZ2',
    icon: 'J<sub>2</sub>',
    topic: 'Presenting',
    html:
    `<p> Jamie is good at doing presentations</p>`
  },
  {
    id: 'BZ3',
    icon: 'J<sub>3</sub>',
    topic: 'Personal Life',
    html:
    `<p> Not much is known about Jamie’s personal life</p>`
  },
  {
    id: 'BZ4',
    icon: 'J<sub>4</sub>',
    topic: 'Age',
    html:
    `<p> Jamie is 29 years old</p>`
  },
  {
    id: 'BZ5',
    icon: 'J<sub>5</sub>',
    topic: 'Reliability',
    html:
    `<p> Jamie is a reliable employee</p>`
  },
  {
    id: 'CX1',
    icon: 'S<sub>1</sub>',
    topic: 'Helping Others',
    html:
    `<p> Sam tries to be very active with helping others</p>`
  },
  {
    id: 'CX2',
    icon: 'S<sub>2</sub>',
    topic: 'Deligation',
    html:
    `<p> Sam tends to defer their own unwanted tasks to others</p>`
  },
  {
    id: 'CX3',
    icon: 'S<sub>3</sub>',
    topic: 'Timeliness',
    html:
    `<p> Sam is often late for work</p>`
  },
  {
    id: 'CX4',
    icon: 'S<sub>4</sub>',
    topic: 'Constructive Nature',
    html:
    `<p> Sam is not good at taking criticism</p>`
  },
  {
    id: 'CX5',
    icon: 'S<sub>5</sub>',
    topic: 'Etiquette',
    html:
    `<p> Sam sometimes talks over others</p>`
  },
  {
    id: 'CY1',
    icon: 'A<sub>1</sub>',
    topic: 'Degree',
    html:
    `<p> Alex has a degree in industrial engineering</p>`
  },
  {
    id: 'CY2',
    icon: 'A<sub>2</sub>',
    topic: 'Conflict Resolution',
    html:
    `<p> Alex is not good at managing conflict</p>`
  },
  {
    id: 'CY3',
    icon: 'A<sub>3</sub>',
    topic: 'Experience',
    html:
    `<p> Alex already knows how the charity is run, having been there for 1 year</p>`
  },
  {
    id: 'CY4',
    icon: 'A<sub>4</sub>',
    topic: 'Childhood',
    html:
    `<p> Alex grew up in a city close to the charity’s headquarters</p>`
  },
  {
    id: 'CY5',
    icon: 'A<sub>5</sub>',
    topic: 'Hobbies',
    html:
    `<p> Alex likes playing chess</p>`
  },
  {
    id: 'CZ1',
    icon: 'J<sub>1</sub>',
    topic: 'Deferring Responsibilities',
    html:
    `<p> Jamie tends to push their own unpleasant work onto others</p>`
  },
  {
    id: 'CZ2',
    icon: 'J<sub>2</sub>',
    topic: 'Commuting',
    html:
    `<p> Jamie sometimes cycles to work</p>`
  },
  {
    id: 'CZ3',
    icon: 'J<sub>3</sub>',
    topic: 'Age',
    html:
    `<p> Jamie is 29 years old</p>`
  },
  {
    id: 'CZ4',
    icon: 'J<sub>4</sub>',
    topic: 'Skill',
    html:
    `<p> Jamie has good organisational skills</p>`
  },
  {
    id: 'CZ5',
    icon: 'J<sub>5</sub>',
    topic: 'Constructive Nature',
    html:
    `<p> Jamie is good at taking on advice when tackling new challenges</p>`
  },


];

module.exports = function (treatmentName, settings, stager, setup, gameRoom) {

  let node = gameRoom.node;
  let channel = gameRoom.channel;
  let memory = node.game.memory;
  let participantInfo = {};
  let players = {};
  let groupChoice = {};

  function sendInfoData() {
    // Send correct selection of data tabs to each player
    var playerIds = node.game.pl.id.getAllKeys();
    playerIds.forEach(function (playerId) {
      console.log('Sending Info data to: ', playerId)
      node.say('INFODATA', playerId, participantInfo[playerId]);
    });
  }

  // Must implement the stages here.

  stager.setOnInit(function () {
    var messageId = 0;

    function storeChatData(msg) {
      // Initialize the client.
      var msgData = msg.data;

      if (messageId !== msgData.id) {
        messageId = msgData.id;

        // Store the value in the registry under the ID of the player (msg.from).
        var userData = channel.registry.getClient(msg.from);

        console.log('storeChatData');

        memory.add({
          player: userData.id,
          stage: userData.stage,
          chatMessage: msgData
        });
      }
    }

    node.on.data('CHAT', function (msg) {
      storeChatData(msg);
    });

    node.on.data('LEVEL_DONE', function (msg) {
      var levelName = 'End';
      // Move client to the next level.
      // (async so that it finishes all current step operations).
      setTimeout(function () {
        console.log('moving client to next level: ', msg.from);
        channel.moveClientToGameLevel(msg.from, levelName, gameRoom.name);
      }, 100);
    });

    node.on.data('RESEND_INFODATA', function (msg) {
      console.log('RESENT_DATA', msg.from);
      node.say('RESENT_DATA', msg.from, participantInfo[msg.from]);
    });

    node.on.data('RESEND_PLAYERS', function (msg) {
      console.log('Resent PLAYERS', msg.from);
      node.say('PLAYERS', msg.from, players);
    });

    node.on.data('GROUP_CHOICE', function (msg) {
      groupChoice[msg.from] = msg.data;
    });
  });

  // The Task

  stager.extendStep('task_start', {
    cb: function () {
      console.log('task_start logic');

      // Get the ids of all players.
      let ids = node.game.pl.id.getAllKeys();
      var infoSelector = {};
      players[ids[0]] = 'Player C';
      players[ids[1]] = 'Player B';
      players[ids[2]] = 'Player A';
      infoSelector[ids[0]] = 'C';
      infoSelector[ids[1]] = 'B';
      infoSelector[ids[2]] = 'A';
      // Send all player ids and names to each player.
      ids.forEach(function (playerId) {
        node.say('PLAYERS', playerId, players);
      });

      // Store the correct selection of data tabs for each participant
      ids.forEach(function (playerId) {
        var output = [];
        ['X', 'Y', 'Z'].forEach(function(columnId) {
          output = output.concat(shuffle(tabData.filter(function (tab) {
            return tab.id.includes(infoSelector[playerId] + columnId);
          })));          
        });
        participantInfo[playerId] = output;
      });

      sendInfoData();

      ids.forEach(function (playerId) {
        var client = channel.registry.getClient(playerId);
        memory.add({
          player: playerId,
          stage: client.stage,
          comprehension_1: client.comprehension_1,
          comprehension_2: client.comprehension_2,
          attention_check: client.attention_check
        });
        gameRoom.updateWin(playerId, 0);
      });
    },
    exit: function () {
      memory.save('data.json')
    },
  });

  // Extends Stages and Steps where needed.

  stager.extendStep('initial_choice', {
    cb: function () {
      console.log('initial_choice logic');
      sendInfoData();

      // Get the ids of all players.
      let ids = node.game.pl.id.getAllKeys();
      ids.forEach(function (idx, i) {
        // Send the other ids to each player.
        node.say('PARTNERS', idx, ids.slice(0, i).concat(ids.slice(i + 1)));
      });
    },
    exit: function () {
      memory.save('data.json');
    },
  });

  stager.extendStep('guided_communication', {
    cb: function () {
      console.log('guided_communication logic');
    },
    exit: function () {
      memory.save('data.json');
    },
  });

  stager.extendStep('message_like', {
    // reconnect: function (player, reconOpts) {
    //   // reconOpts.counter = 100;
    //   // reconOpts.cb = function(reconOpts) {
    //   //     node.game.counter = reconOpts.counter;
    //   // };
    //   var chatMessages = memory.select('chatMessage').fetch();
    //   setTimeout(function () {
    //     console.log('Resent CHATMESSAGES', player.id, chatMessages)
    //     node.say('CHATMESSAGES', player.id, chatMessages);
    //   }, 2000);
    // },
    cb: function () {
      console.log('message_like logic');

      var chatMessages = memory.select('chatMessage').fetch();

      // Loop through all connected players.
      node.game.pl.each(function (player) {
        // console.log('Sent CHATMESSAGES', player.id, chatMessages)
        node.say('CHATMESSAGES', player.id, chatMessages);
      });

      node.on.data('RESEND_CHATMESSAGES', function (msg) {
        console.log('RESENT CHATMESSAGES', msg.from);
        node.say('CHATMESSAGES', msg.from, chatMessages);
      });
    },
    exit: function () {
      memory.save('data.json');
    },
  });

  stager.extendStep('secondary_choice', {
    cb: function () {
      console.log('secondary_choice logic');
    },
    exit: function () {
      memory.save('data.json');
    },
  });

  stager.extendStep('group_choice', {
    cb: function () {
      console.log('group_choice logic');

      node.on.data('RESEND_GROUP_CHOICE', function (msg) {
        console.log('RESENT GROUP_CHOICE', msg.from, groupChoice);
        node.say('GROUP_CHOICE', msg.from, groupChoice);
      });
    },
    exit: function () {

      console.log('***** here marks the spot:', memory.select('value.group_choice').fetch()[0].value.group_choice);
      var sliderValues = memory.select('value.group_choice').fetch()[0].value.group_choice;
      var wheat = sliderValues[1];
      var sugar = sliderValues[2];
      var reward = Math.max((wheat * 0.5) + (sugar * 0.25), 2.5);
      // console.log('reward', reward);

      // Loop through all connected players.
      console.log('playerIds', Object.keys(node.game.memory.player));
      Object.keys(node.game.memory.player).forEach(function(playerId) {
        // gameRoom.updateWin(player.id, reward);
        console.log('player', playerId, 'reward', reward);
        channel.registry.updateClient(playerId, { reward: reward });
      });

      // node.game.pl.each(function (player) {
      //   // gameRoom.updateWin(player.id, reward);
      //   console.log('player', player.id, 'reward', reward);
      //   channel.registry.updateClient(player.id, { reward: reward });
      // });

      memory.save('data.json');
    },
  });

  stager.extendStep('intra_task_1', {
    cb: function () {
      console.log('post_task_1 logic');
    },
    exit: function () {
      memory.save('data.json');
    },
  })

  stager.extendStep('intra_task_2', {
    cb: function () {
      console.log('post_task_2 logic');
    },
    exit: function () {
      memory.save('data.json');
    },
  })

  // stager.setOnGameOver(function () {
  //   memory.save('data.json');

  //   node.game.pl.each(function (player) {
  //     console.log('Saving data for', player.id);
  //     memory.player[player.id].save('data_player_' + player.id + '.json');
  //   });
  // });
};
