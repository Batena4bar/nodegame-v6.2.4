/**
 * # Game stages definition file
 * Copyright(c) 2021 Sam Bateman <samuel.bateman@icloud.com>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function (stager, settings) {

  //  stager.onGameOver(function() {
  // // Possible actions:
  // // - Store results
  // // - Move clients to another room
  // // - Destroy room
  //  });

  stager
    // Title
    .stage('info_and_consent')
    .step('info_and_consent_1')
    .step('info_and_consent_2')
    .step('title')

    // Pre-tasks
    .stage('pre_task_0')
    .step('pre_task_1')
    .step('pre_task_2')
    .step('pre_task_3')
    .step('pre_task_4')
    .step('pre_task_5')

    // An explanation of the practical aspect of the task
    .stage('video')
    .step('instructions_video')

    // Manipulation screen
    .loopStage('backgound', function () {
      console.log('treatment for ' + this.node.nodename, this.settings.CONTROL ? 'control' : this.settings.name);
      if (this.settings.CONTROL || this.background_loop_ended) {
        return false;
      }
      this.background_loop_ended = true;
      return true;
    })
    .step('the_scenario_1')
    .step('the_scenario_2')
    .step('the_scenario_3')

    .stage('task_0')
    .step('task_start')

    // The task
    .loopStage('task_1', function () {   
      // ADD: If using bots, skip this stage
      if (this.settings.CONTROL || this.task_loop_ended) {
        return false;
      }
      this.task_loop_ended = true;
      return true;
    })
    .step('initial_choice')
    .step('guided_communication')
    .step('message_like')
    .step('secondary_choice')
    .step('group_choice')

    // Manipulation Checks
    .stage('task_2')
    .step('post_task_1')
    .step('post_task_2')

    // Ends
    .stage('end_study')
    .step('thank_you')
    .step('debrief')
    .step('end_of_game')
    .gameover();

  // Modify the stager to skip one stage.
  // stager.skip('instructions');

  // To skip a step within a stage use:
  // stager.skip('stageName', 'stepName');
  // Notice: here all stages have just one step.
};
