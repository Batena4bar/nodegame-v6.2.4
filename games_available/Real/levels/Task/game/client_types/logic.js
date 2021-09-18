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
    id: '1',
    icon: 'circle',
    topic: 'El Niño',
    html:
      `<p>El Nino is due to begin shortly, a cyclical weather phenomenon that affects South America and much of Asia-Pacific. Although usually well managed by farmers in those regions, the extreme weather conditions can sometimes be cause for concern.</p>`
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
      `<p>(unique)</p><p>It is predicted that the recent outbreaks of Australian forest fires will tear through nearby dry crop fields. If it does Australia could move from a major exporter of wheat to a net importer instead.
      </p>`
  },
  {
    id: 'A2',
    icon: 'star',
    topic: 'Wheat growing out of necessity',
    html:
      `<p>(unique)</p><p>A change in tariffs between Canada and neighbouring regions, poor crop yields last year, and current high prices are leading to many farmers converting much of their farmland to the growing of wheat.
      </p>`
  },
  {
    id: 'A3',
    icon: 'pentagon',
    topic: 'Ethanol Production',
    html:
      `<p>(unique)</p><p>Supported by governmental incentives much of the Brazilian infrastructure is now powered by ethanol. It has been made more lucrative to farmers to sell any excess sugar supply internally to ethanol refineries rather than exporting it.
      </p>`
  },
  {
    id: 'A4',
    icon: 'diamond',
    topic: 'Brazilian weather',
    html:
      `<p>(unique)</p><p>The South American Agricultural Association has predicted that weather conditions in Brazil this year will be advantageous to sugar production but are likely to provide only a mediocre coffee yield.
      </p>`
  },
  {
    id: 'A5',
    icon: 'hexagon',
    topic: 'Particularly Wet Monsoon',
    html:
      `<p>(unique)</p><p>A meteorological office report suggests that a particularly wet monsoon season will hit India allowing for the perfect conditions for growing coffee. However, a supplementary report suggests that strong winds will push the monsoon further north than usual leaving the coffee growing regions unusually dry, similar to the previous year. Unlike Indonesia and Vietnam, India wouldn’t have the appropriate irrigation and reservoir systems to cope with this. 
      </p>`
  },
  {
    id: 'B1',
    icon: 'square',
    topic: 'Crop Transitions',
    html:
      '<p>(unique)</p><p>Data collections show regions in India that used to grow cereal crops are now starting to grow more coffee and traditional coffee growing regions have now switched to growing cereals. The success of this change depends on a repeat of the unusual weather patterns that have been occurring over the previous 2 years.</p>',
  },
  {
    id: 'B2',
    icon: 'star',
    topic: 'Chinese import and export tax',
    html:
      `<p>(unique)</p><p>In an attempt to make China more self-sufficient, the Chinese government is increasing its import/export tax. Farmers are likely to grow more foods for home consumption and rely less on exporting foods like sugar in the coming years.</p>`,
  },
  {
    id: 'B3',
    icon: 'pentagon',
    topic: 'New farming techniques',
    html:
      '<p>(unique)</p><p>Due to new farming techniques, sugar beet and wheat crops are a more viable option for farmers in a greater number of USA regions. Farmers are starting to move over to growing these crops. It is predicted production will increase gradually over the coming years.</p>',
  },
  {
    id: 'B4',
    icon: 'diamond',
    topic: 'Pirate activity',
    html:
      '<p>(unique)</p><p>The apparent increase in pirate activity in the waters off the East African coast could disrupt the smooth passage of food exports from countries in that region, such as coffee from Ethiopia and Kenya. The situation is being carefully monitored.</p>',
  },
  {
    id: 'B5',
    icon: 'hexagon',
    topic: 'Weather conditions in Columbia',
    html:
      '<p>(unique)</p><p>Advanced weather predictions indicate that there will be heavy rainfall throughout the whole of the flowering period for coffee in Columbia. Strong winds will follow causing an exceptionally dry period. Perfect conditions for growing coffee.</p>',
  },
  {
    id: 'C1',
    icon: 'square',
    topic: 'Currency decrease',
    html:
      '<p>(unique)</p><p>A sudden fall in global oil prices has caused the Russian currency to devalue. Buying Russian exports is now much cheaper. Their largest food exports are fish, such as pilchards and salmon, and grains, such as wheat and barley.</p>',
  },
  {
    id: 'C2',
    icon: 'star',
    topic: 'Crop Rust',
    html:
      '<p>(unique)</p><p>Wet weather conditions in North and South America is causing Crop Rust to become more prevalent. The disease is a particular issue where there are large areas of the same crop planted, especially wheat. It has the potential to decimate large areas but isn’t yet considered a concern.</p>',
  },
  {
    id: 'C3',
    icon: 'pentagon',
    topic: 'Cost of weedkiller',
    html:
      '<p>(unique)</p><p>A rise in the cost of weedkillers used in the sugar-growing regions of Thailand means farmers are likely going to have to use it a lot more sparingly. It is unsure what effect this will have on crop yield. The Thai government is keeping this under review.</p>',
  },
  {
    id: 'C4',
    icon: 'diamond',
    topic: 'Drought in Vietnam',
    html:
      '<p>(unique)</p><p>If the weather conditions in Vietnam do not improve, they are set to reach drought levels in the coming 6 months. in general, coffee plants require wet conditions when flowering and dry conditions for harvesting.</p>',
  },
  {
    id: 'C5',
    icon: 'hexagon',
    topic: 'Change in coffee type',
    html:
      '<p>(unique)</p><p>Some Ethiopian farmers have started growing a new variety of coffee beans. The coffee plants are more suited to the Ethiopian climate and have the potential to increase crop yield by 3%.</p>',
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
      console.log('Sending INfro data to: ', playerId)
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
        participantInfo[playerId] = shuffle(tabData.filter(function (tab) {
          return tab.id === '1' || tab.id === '2' || tab.id.includes(infoSelector[playerId]);
        }));
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
      var wheat = sliderValues[0];
      var sugar = sliderValues[1];
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
