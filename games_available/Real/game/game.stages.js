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
    .stage('title')

    // Test sliders
    .stage('sliders')

    // Test chat
    .stage('chat')

    // A setup to the experiment, this is in the form of a vignette
    .stage('background')
    .step('background_1')
    .step('background_2')

    // A test for undertanding of the task (conceptual)
    .stage('pre_task')
    .step('pre_task_1')
    .step('pre_task_2')

    // An explaination of the practical aspect of the task
    .stage('video')

    // This is where the treatments are administered
    .stage('treatment_page')

    // The task
    // .repeatStage('task', settings.ROUNDS)
    // .step('initialChoice')
    // .step('guidedCommunication')
    // .step('messageLiking')
    // .step('groupChoice')

    // // Post-hoc tests
    //  .stage('Post Task')
    // .step('Post Task 1')
    // .step('Post Task 2')

    // // Finish
    // .next('Debrief')
    // .next('Endgame')
    .stage('end')
    .gameover();

  // Modify the stager to skip one stage.
  // stager.skip('instructions');

  // To skip a step within a stage use:
  // stager.skip('stageName', 'stepName');
  // Notice: here all stages have just one step.
};
