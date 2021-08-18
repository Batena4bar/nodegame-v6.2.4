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
const tabData = [
  {
    id: '1',
    icon: 'file',
    topic: 'El Niño & La El Nina',
    html:
      `<p>El Niño is a weather phenomenon that can have a number of effects, typically it entails excessive rains and floods in South America and severe drought and hotter average temperatures, for most regions of Asia-Pacific. This can frequently lead to food insecurity for affected countries.</p>
      <p>La Nina is a somewhat opposite weather phenomenon that entails wetter environments and cooler average temperatures, for the same regions of Asia-Pacific.</p>`
  },
  {
    id: '2',
    icon: '',
    topic: 'Top 7 Wheat Producing Countries',
    html:
      `<table>
        <tr><th>Country</th></tr>
        <tr><td>1</td><td>China</td></tr>
        <tr><td>2</td><td>India</td></tr>
        <tr><td>3</td><td>Russia</td></tr>
        <tr><td>4</td><td>USA</td></tr>
        <tr><td>5</td><td>France</td></tr>
        <tr><td>6</td><td>Canada</td></tr>
        <tr><td>7</td><td>Germany</td></tr>
      </table>`,
  },
  {
    id: 'A1',
    icon: 'anchor',
    topic: 'ENSO weather cycle',
    html:
      `<p>Eastern and southern Africa, Latin America and the Asia-Pacific region experience a cyclical extreme weather pattern called ENSO. A warming of the central to eastern tropical Pacific Ocean, ENSO affects millions of people directly. This cycle can have a period of between 3 to 7 years.</p>
      <p>The three phases of the ENSO cycle are named El Niño, La Nina and Neutral.</p>`
  },
  {
    id: 'A2',
    icon: 'star',
    topic: 'Weather issues for sugar',
    html:
      `<p>Sugar is regarded as a robust crop, it can be grown in many regions across the world in either sugar cane or sugar beet form. Sugar cane grows best in a consistently temperate climate and with plenty of water. This means the most damaging conditions for sugar are draught, far more so than excess water.</p>`
  },
  {
    id: 'A3',
    icon: 'calendar',
    topic: 'Weather Forecast',
    html:
      `<p>The El Niño weather pattern (as referenced in F) is predicted to begin this March and will carry on throughout the rest of the year.</p>`
  },
  {
    id: 'A4',
    icon: 'play',
    topic: 'Price of the dollar',
    html:
      `<p>The depreciating price of the US dollar has caused the price of commodities to increase when imported from foreign countries. This leads farmers to seek internal forms of sale if available.</p>`
  },
  {
    id: 'B1',
    icon: 'folder',
    topic: 'Brazil\'s move to using sugar as fuel',
    html:
      '<p>Brazil is in the midst of a national transition towards favouring transport which uses ethanol instead of fossil fuels to power its engines. Ethanol is a far cheaper alternative to fossil fuels for the nation since ethanol is made from sugar and so Brazilian farmers are able to sell sugar straight to the refineries.</p>',
  },
  {
    id: 'B2',
    icon: 'square',
    topic: 'Principal sugar exporting countries in 2019/2020',
    html:
      `<img src="imgs/sugar_exporting_countries.png" width="100%">`,
  },
  {
    id: 'B3',
    icon: 'diamond',
    topic: 'British farming subsidies',
    html:
      '<p>Britain relies on exports of most commodities. Typically, those producers inside the UK are given subsidies by the government to keep pricing competitive. Those crops commonly produced in the UK are less subject to global price shocks since they are less reliant on imports.</p>',
  },
  {
    id: 'B4',
    icon: 'film',
    topic: 'UK wheat consumption',
    html:
      '<p>The total production of wheat in the UK is 80% of that this it consumes.</p>',
  },
  {
    id: 'C1',
    icon: 'image',
    topic: 'Global wheat supply 1',
    html:
      '<p>The global wheat supply is expected to shrink this year due to poor weather and other grains taking priority to farmers over the previous year.</p>',
  },
  {
    id: 'C2',
    icon: 'image',
    topic: 'Global wheat supply 2',
    html:
      '<p>The global wheat supply is expected to shrink this year due to poor weather and other grains taking priority to farmers over the previous year.</p>',
  },
  {
    id: 'C3',
    icon: 'image',
    topic: 'Global wheat supply 3',
    html:
      '<p>The global wheat supply is expected to shrink this year due to poor weather and other grains taking priority to farmers over the previous year.</p>',
  },
  {
    id: 'C4',
    icon: 'image',
    topic: 'Global wheat supply 4',
    html:
      '<p>The global wheat supply is expected to shrink this year due to poor weather and other grains taking priority to farmers over the previous year.</p>',
  },
];

module.exports = function (treatmentName, settings, stager, setup, gameRoom) {

  let node = gameRoom.node;
  let channel = gameRoom.channel;
  let memory = node.game.memory;

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
  });

  //    stager.extendStep('game', {
  //        matcher: {
  //            roles: [ 'DICTATOR', 'OBSERVER' ],
  //            match: 'round_robin',
  //            cycle: 'mirror_invert',
  //            // sayPartner: false
  //            // skipBye: false,
  //
  //        },
  //        cb: function() {
  //            node.once.data('done', function(msg) {
  //                let data = msg.data;
  //                let offer = data.offer;
  //
  //                // Send the decision to the other player.
  //                node.say('decision', data.partner, offer);
  //
  //                // Update earnings counts, so that it can be saved
  //                // with GameRoom.computeBonus.
  //                gameRoom.updateWin(msg.from, settings.COINS - offer);
  //                gameRoom.updateWin(data.partner, offer);
  //
  //            });
  //        }
  //    });

  //    stager.extendStep('end', {
  //        init: function() {
  //
  //            // Feedback.
  //            memory.view('feedback').save('feedback.csv', {
  //                header: [ 'time', 'timestamp', 'player', 'feedback' ],
  //                keepUpdated: true
  //            });
  //
  //            // Email.
  //            memory.view('email').save('email.csv', {
  //                header: [ 'timestamp', 'player', 'email' ],
  //                keepUpdated: true
  //            });
  //
  //        },
  //        cb: function() {
  //
  //            // Saves bonus file, and notifies players.
  //            gameRoom.computeBonus();
  //
  //            // Dump all memory.
  //            memory.save('memory_all.json');
  //
  //            // Save times of all stages.
  //            memory.done.save('times.csv', {
  //                header: [
  //                    'session', 'player', 'stage', 'step', 'round',
  //                    'time', 'timeup'
  //                ]
  //            });
  //        }
  //    });

  // Extends Stages and Steps where needed.

  stager.extendStep('info_and_consent_1', {
    cb: function () {
      console.log('info_and_consent_1 logic');

      // Get the ids of all players.
      let ids = node.game.pl.id.getAllKeys();
      var players = {};
      var infoSelector = {};
      players[ids[0]] = 'Player A';
      players[ids[1]] = 'Player B';
      players[ids[2]] = 'Player C';
      infoSelector[ids[0]] = 'A';
      infoSelector[ids[1]] = 'B';
      infoSelector[ids[2]] = 'C';
      // Send all player ids and names to each player.
      ids.forEach(function (playerId) {
        node.say('PLAYERS', playerId, players);
      });

      // Send correct selection of data tabs to each player
      ids.forEach(function (playerId) {
        node.say('INFODATA', playerId, tabData.filter(function (tab) {
          return tab.id === '1' || tab.id === '2' || tab.id.includes(infoSelector[playerId]);
        }));
      });
    },
    exit: function () {
      memory.save('data.json');
    },
  });

  stager.extendStep('task_start', {
    exit: function () {
      console.log('Saving all data');
      memory.save('data.json');
    },
  });

  stager.extendStep('initial_choice', {
    cb: function () {
      console.log('initial_choice logic');

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
    cb: function () {
      console.log('message_like logic');

      var chatMessages = memory.select('chatMessage').fetch();

      // Loop through all connected players.
      node.game.pl.each(function (player) {
        // console.log('Sent CHATMESSAGES to', player.id);
        node.say('CHATMESSAGES', player.id, chatMessages);
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
    },
    exit: function () {
      memory.save('data.json');
    },
  });

  stager.extendStep('post_task_1', {
    cb: function () {
      console.log('post_task_1 logic');
    },
    exit: function () {
      memory.save('data.json');
    },
  })

  stager.extendStep('post_task_2', {
    cb: function () {
      console.log('post_task_2 logic');
    },
    exit: function () {
      memory.save('data.json');
    },
  })

  stager.setOnGameOver(function () {
    memory.save('data.json');

    node.game.pl.each(function (player) {
      console.log('Saving data for', player.id);
      memory.player[player.id].save('data_player_' + player.id + '.json');
    });
  });
};
