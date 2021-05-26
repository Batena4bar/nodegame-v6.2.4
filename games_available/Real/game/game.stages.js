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

    // The task
    .repeatStage('task', settings.ROUNDS)
    .step('initial_choice')
    .step('guided_communication')
    .step('secondary_choice')
    .step('group_choice')


    // Title
    .stage('title')

    // Manipulation Checks
    .stage('post_task')
    .step('post_task_1')
    .step('post_task_2')
    .step('post_task_3')

    // A setup to the experiment, this is in the form of a vignette, each background page is followed by an attention check
    .stage('pre_task')
    .step('pre_task_1')
    .step('pre_task_2')
    .step('pre_task_3')
    .step('pre_task_4')
    .step('pre_task_5')
    .step('pre_task_6')

    // An explaination of the practical aspect of the task
    .stage('instructions_video')

    // Manipulation screen
    .stage('treatment_page')
    .stage('treatment_2')



    .stage('debrief')
    .stage('sliders')
    .stage('chat')
    .stage('multi_sliders')
    .stage('end')
    .gameover();



  //  // Test sliders
  //  .stage('sliders')

  //  // Test chat
  //  .stage('chat')

  //  // Test sliders
  //  .stage('multi_sliders')




  // The task
  // .repeatStage('task', settings.ROUNDS)
  // .step('initialChoice')
  // .step('guidedCommunication')
  // .step('messageLiking')
  // .step('groupChoice')


  // Modify the stager to skip one stage.
  // stager.skip('instructions');

  // To skip a step within a stage use:
  // stager.skip('stageName', 'stepName');
  // Notice: here all stages have just one step.
};
