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
    icon: 'square',
    topic: 'Conflict Resolution',
    html:
      `<p> Person X is good at resolving conflict</p>`
  },
  {
    id: 'AX2',
    icon: 'star',
    topic: 'Work Abroad',
    html:
    `<p> Person X has previously been working abroad in the US</p>`
  },
  {
    id: 'AX3',
    icon: 'pentagon',
    topic: 'Age',
    html:
    `<p> Person X is 33 years old</p>`
  },
  {
    id: 'AX4',
    icon: 'diamond',
    topic: 'Qualification',
    html:
    `<p> Person X has done a bachelors degree</p>`
  },
  {
    id: 'AX5',
    icon: 'hexagon',
    topic: 'Attitude',
    html:
    `<p> Person X can often be rude</p>`
  },
  {
    id: 'AY1',
    icon: 'square',
    topic: 'Constructive Nature',
    html:
    `<p> Person Y tends to take criticism well</p>`
  },
  {
    id: 'AY2',
    icon: 'star',
    topic: 'Respect',
    html:
    `<p> Person Y treats others with respect</p>`
  },
  {
    id: 'AY3',
    icon: 'pentagon',
    topic: 'Knowledge',
    html:
    `<p> Person Y is knowledgeable about the newest developments within management technologies</p>`
  },
  {
    id: 'AY4',
    icon: 'diamond',
    topic: 'Resentment',
    html:
    `<p> Person Y has been known to hold grudges against colleagues</p>`
  },
  {
    id: 'AY5',
    icon: 'hexagon',
    topic: 'Reliability',
    html:
    `<p> Person Y is a reliable employee</p>`
  },
  {
    id: 'AZ1',
    icon: 'square',
    topic: 'Creativity',
    html:
    `<p> Person Z has poor creativity when coming up with new ideas</p>`
  },
  {
    id: 'AZ2',
    icon: 'star',
    topic: 'Consistency',
    html:
    `<p> Person Z is often not consistent in the way th carry out procedures within the workplace</p>`
  },
  {
    id: 'AZ3',
    icon: 'pentagon',
    topic: 'Nationality',
    html:
    `<p> Person Z was born in Austria</p>`
  },
  {
    id: 'AZ4',
    icon: 'diamond',
    topic: 'Hobbies',
    html:
    `<p> Person Z likes to play snooker</p>`
  },
  {
    id: 'AZ5',
    icon: 'hexagon',
    topic: 'Sharpness',
    html:
    `<p> Person Z is very quick to understand what needs to be done</p>`
  },
  {
    id: 'BX1',
    icon: 'square',
    topic: 'Knowledge',
    html:
    `<p> Person X is well informed about how businesses operate</p>`
  },
  {
    id: 'BX2',
    icon: 'star',
    topic: 'Pressure',
    html:
    `<p> Person X works well under pressure</p>`
  },
  {
    id: 'BX3',
    icon: 'pentagon',
    topic: 'Nationality',
    html:
    `<p> Person X is from the UK</p>`
  },
  {
    id: 'BX4',
    icon: 'diamond',
    topic: 'Parent',
    html:
    `<p> Person X has two children</p>`
  },
  {
    id: 'BX5',
    icon: 'hexagon',
    topic: 'Coping Style',
    html:
    `<p> Person X can get very stressed</p>`
  },
  {
    id: 'BY1',
    icon: 'square',
    topic: 'Childhood',
    html:
    `<p> Person Y grew up in a city close to the charity’s headquarters</p>`
  },
  {
    id: 'BY2',
    icon: 'star',
    topic: 'Attitude',
    html:
    `<p> Person Y only does what needs to be done</p>`
  },
  {
    id: 'BY3',
    icon: 'pentagon',
    topic: 'Work Experience',
    html:
    `<p> Person Y has previously worked for a taxi company</p>`
  },
  {
    id: 'BY4',
    icon: 'diamond',
    topic: 'Poplarity',
    html:
    `<p> Person Y is already popular with the other employees</p>`
  },
  {
    id: 'BY5',
    icon: 'hexagon',
    topic: 'Sharpness',
    html:
    `<p> Person Y is slow at learning new information</p>`
  },
  {
    id: 'BZ1',
    icon: 'square',
    topic: 'Resolving Conflict',
    html:
    `<p> Person Z is not good at managing conflict</p>`
  },
  {
    id: 'BZ2',
    icon: 'star',
    topic: 'Presenting',
    html:
    `<p> Person Z is good at doing presentations</p>`
  },
  {
    id: 'BZ3',
    icon: 'pentagon',
    topic: 'Personal Life',
    html:
    `<p> Not much is know about Person Z’s personal life</p>`
  },
  {
    id: 'BZ4',
    icon: 'diamond',
    topic: 'Age',
    html:
    `<p> Person Z is 29 years old</p>`
  },
  {
    id: 'BZ5',
    icon: 'hexagon',
    topic: 'Reliability',
    html:
    `<p> Person Z is a reliable employee</p>`
  },
  {
    id: 'CX1',
    icon: 'square',
    topic: 'Helping Others',
    html:
    `<p> Person X tries to be very active with helping others</p>`
  },
  {
    id: 'CX2',
    icon: 'star',
    topic: 'Deligation',
    html:
    `<p> Person X tends to defer their own unwanted tasks to others</p>`
  },
  {
    id: 'CX3',
    icon: 'pentagon',
    topic: 'Timeliness',
    html:
    `<p> Person X is often late for work</p>`
  },
  {
    id: 'CX4',
    icon: 'diamond',
    topic: 'Constructive Nature',
    html:
    `<p> Person X is not good at taking criticism</p>`
  },
  {
    id: 'CX5',
    icon: 'hexagon',
    topic: 'Etiquette',
    html:
    `<p> Person X sometimes talks over others</p>`
  },
  {
    id: 'CY1',
    icon: 'square',
    topic: 'Degree',
    html:
    `<p> Person Y has a degree in industrial engineering</p>`
  },
  {
    id: 'CY2',
    icon: 'star',
    topic: 'Conflict Resolution',
    html:
    `<p> Person Y is not good at managing conflict</p>`
  },
  {
    id: 'CY3',
    icon: 'pentagon',
    topic: 'Experience',
    html:
    `<p> Person Y already knows how the charity is run, having been there for 1 year</p>`
  },
  {
    id: 'CY4',
    icon: 'diamond',
    topic: 'Childhood',
    html:
    `<p> Person Y grew up in a city close to the charity’s headquarters</p>`
  },
  {
    id: 'CY5',
    icon: 'hexagon',
    topic: 'Hobbies',
    html:
    `<p> Person Y likes playing chess</p>`
  },
  {
    id: 'CZ1',
    icon: 'square',
    topic: 'Deffering Responsibilities',
    html:
    `<p> Person Z tends to push their own unpleasant work onto others</p>`
  },
  {
    id: 'CZ2',
    icon: 'star',
    topic: 'Commuting',
    html:
    `<p> Person Z sometimes cycles to work</p>`
  },
  {
    id: 'CZ3',
    icon: 'pentagon',
    topic: 'Age',
    html:
    `<p> Person Z is 29 years old</p>`
  },
  {
    id: 'CZ4',
    icon: 'diamond',
    topic: 'Skill',
    html:
    `<p> Person Z has good organisational skills</p>`
  },
  {
    id: 'CZ5',
    icon: 'hexagon',
    topic: 'Constructive Nature',
    html:
    `<p> Person Z is good at taking on advice when tackling new challenges</p>`
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

      // Loop through all connected players.
      node.game.pl.each(function (player) {
        // gameRoom.updateWin(player.id, reward);
        channel.registry.updateClient(player.id, { reward: reward });
      });

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
