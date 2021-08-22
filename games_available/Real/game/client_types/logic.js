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
const J = ngc.JSUS;
const tabData = [
  {
    id: '1',
    icon: 'circle',
    topic: 'El Niño',
    html:
      `<p>El Niño is a cyclical weather phenomenon that is about to begin. It often entails extreme weather conditions in South America and most regions of Asia-Pacific. This is usually well managed by farmers but can lead people to feel insecure about food in the affected regions.</p>`
  },
  {
    id: '2',
    icon: 'triangle',
    topic: 'Top 4 Food Producers',
    html:
      `<div class="producer-tables">
        <table>
          <tr><th>Wheat</th></tr>
          <tr><td>1</td><td>China</td></tr>
          <tr><td>2</td><td>India</td></tr>
          <tr><td>3</td><td>Russia</td></tr>
          <tr><td>4</td><td>USA</td></tr>
        </table>
        <br>
        <table>
          <tr><th>Sugar</th></tr>
          <tr><td>1</td><td>Brazil</td></tr>
          <tr><td>2</td><td>India</td></tr>
          <tr><td>3</td><td>Thailand</td></tr>
          <tr><td>4</td><td>China</td></tr>
        </table>
        <br>
        <table>
          <tr><th>Coffee</th></tr>
          <tr><td>1</td><td>Brazil</td></tr>
          <tr><td>2</td><td>Vietnam</td></tr>
          <tr><td>3</td><td>Columbia</td></tr>
          <tr><td>4</td><td>Etheopia</td></tr>
        </table>
      </div>`,
  },
  {
    id: 'A1',
    icon: 'square',
    topic: 'Forest fire',
    html:
      `<p>An Australian forest fire has started. It is predicted that this will tear through dry crop fields, such as wheatfields. If it does it would cause Australia to go from being one of the biggest exporters of wheat to being a net importer instead.
      </p>`
  },
  {
    id: 'A2',
    icon: 'star',
    topic: 'Wheat growing out of necessity',
    html:
      `<p>A declining economy and poor crop last year has caused farmers in Canada to grow more wheat as it is one of the few crops that they can get a good return on at the moment. This will mean some areas of farmland will be heavily devoted to wheat.
      </p>`
  },
  {
    id: 'A3',
    icon: 'pentagon',
    topic: 'Ethanol Production',
    html:
      `<p>Due to governmental incentives, much of the infrastructure within Brazil is now powered by ethanol. This means that when they have a better than average sugar crop, it is more valuable for the farmers to sell the sugar internally to ethanol refineries instead of exporting it.
      </p>`
  },
  {
    id: 'A4',
    icon: 'diamond',
    topic: 'Brazilian weather',
    html:
      `<p>The South American agricultural association has predicted weather conditions in Brazil which would be advantageous for growing sugar but likely to only yield a mediocre coffee crop. 
      </p>`
  },
  {
    id: 'A5',
    icon: 'hexagon',
    topic: 'Particularly Wet Monsoon',
    html:
      `<p>A reliable meteorological office report has predicted a particularly wet monsoon season which would create the perfect conditions for growing coffee. However, a second reliable source predicts that strong winds could push the monsoon much further north than usual. This would leave the big coffee growing regions in India unusually dry and the grain-growing regions unusually wet. India does not have a sophisticated reservoir or irrigation system to cope with dry seasons like Singapore or Vietnam. 
      </p>`
  },
  {
    id: 'B1',
    icon: 'square',
    topic: 'Crop Transitions',
    html:
      '<p>Data collected from Indian farmers indicates that regions that used to predominantly grow grains, such as wheat, are transitioning over to berry crops, like coffee, and vice versa. They are basing this change on weather behaviours in these regions over the last two years. However, these weather patterns are not guaranteed to continue.</p>',
  },
  {
    id: 'B2',
    icon: 'star',
    topic: 'Chinese import and export tax',
    html:
      `<p>The Chinese government is predicted to increase tax on imported and exported goods in an attempt to encourage their farmers to move away from growing food types that they have previously exported to food types which they currently have to import. This move is in the hope that China can become more self-sufficient. It is expected that this will cause a substantial reduction in exported sugar.</p>`,
  },
  {
    id: 'B3',
    icon: 'pentagon',
    topic: 'New farming techniques',
    html:
      '<p>Due to new farming techniques, sugar beet and wheat crop is now a viable option for farmers in more regions within the US. Farmers have started moving over to growing these crops so there should be an increase in the production of these two crops throughout the coming years.</p>',
  },
  {
    id: 'B4',
    icon: 'diamond',
    topic: 'Pirate activity',
    html:
      '<p>The apparent increase in the activity of pirates off the coast of East Africa could disrupt the smooth passage of food exports, such as coffee, out of Ethiopia and Kenya. The situation is being carefully monitored.</p>',
  },
  {
    id: 'B5',
    icon: 'hexagon',
    topic: 'Weather conditions in Columbia',
    html:
      '<p>Advanced weather predictions based on the El Nino weather patterns have indicated that there will be heavy rainfall throughout the entire typical flowering period for coffee in Columbia. Following this strong winds will cause an exceptionally dry period. This will create ideal weather conditions for growing coffee.</p>',
  },
  {
    id: 'C1',
    icon: 'square',
    topic: 'Currency decrease',
    html:
      '<p>The Russian currency has devalued recently due to a sudden fall in global oil prices. Buying Russian exports has become much cheaper. Their biggest food exports are fish, such as pilchard and salmon, and grains, such as wheat and barley.</p>',
  },
  {
    id: 'C2',
    icon: 'star',
    topic: 'Crop Rust',
    html:
      '<p>Due to current wet weather conditions, various forms of crop rust are expected to start spreading through both North and South America. This form of the disease is particularly an issue for large areas of any single crop type, especially wheat. It can ruin large areas if it takes hold but hasn’t been considered an issue at the moment.</p>',
  },
  {
    id: 'C3',
    icon: 'pentagon',
    topic: 'Cost of weedkiller',
    html:
      '<p>A rise in the cost of the weedkiller used in the main sugar-growing regions of Thailand has meant that farmers are now having to use them more sparingly than they have previously. This hasn’t been identified as an immediate issue but the Thai government is remaining cautious.</p>',
  },
  {
    id: 'C4',
    icon: 'diamond',
    topic: 'Drought in Vietnam',
    html:
      '<p>Weather conditions in Vietnam are approaching drought levels in the next few months. They are the second biggest growers of coffee in the world. Coffee plants require wet conditions when flowering and dry conditions to be harvested.</p>',
  },
  {
    id: 'C5',
    icon: 'hexagon',
    topic: 'Change in coffee type',
    html:
      '<p>A new type of coffee bean has started to grow in popularity in Ethiopia. It is expected that these beans will be far more resilient to the Ethiopian climate and have the potential to increase crop yield by 3%.</p>',
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
        node.say('INFODATA', playerId, shuffle(tabData.filter(function (tab) {
          return tab.id === '1' || tab.id === '2' || tab.id.includes(infoSelector[playerId]);
        })));
      });
    },
    exit: function () {
      memory.save('data.json')
    },
  });

  // Check these 3 steps
  stager.extendStep('the_scenario_1', {
    cb: function () {
      if (node.game.settings.treatmentName === 'control') node.done();
    },
  });

  stager.extendStep('the_scenario_2', {
    cb: function () {
      if (node.game.settings.treatmentName === 'control') node.done();
    },
  });

  stager.extendStep('the_scenario_3', {
    cb: function () {
      if (node.game.settings.treatmentName === 'control') node.done();
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
