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
    .step('questionnaire_1')
    .step('questionnaire_2')
    .step('title')

    // Pre-tasks
    .stage('pre_task_0')
    .step('pre_task_1')
    .step('pre_task_2')
    .step('pre_task_3')
    .step('pre_task_4')
    //.step('pre_task_4')
    //.step('pre_task_5')

    // An explanation of the practical aspect of the task
    .stage('video')
    .step('instructions_video')

  // Modify the stager to skip one stage.
  // stager.skip('instructions');

  // To skip a step within a stage use:
  // stager.skip('stageName', 'stepName');
  // Notice: here all stages have just one step.
};
