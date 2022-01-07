module.exports = function (stager, settings) {

    //  stager.onGameOver(function() {
    // // Possible actions:
    // // - Store results
    // // - Move clients to another room
    // // - Destroy room
    //  });

    stager
        .stage('task_0')
        .step('task_start')

        .stage('initial_choice')

        // Manipulation screen
        .loopStage('the_scenario', function () {
            console.log('node', this.node, 'settings', this.settings);
            console.log('treatment for ' + this.node.nodename, this.settings.CONTROL ? 'control' : this.settings.name);
            if (this.settings.treatmentName === 'control' || this.background_loop_ended) {
                return false;
            }
            this.background_loop_ended = true;
            return true;
        })
        // .stage('the_scenario')
        .step('the_scenario_1')
        .step('the_scenario_2')
        //.step('the_scenario_3')
        .stage('intra_task_questionnaire')
        .step('intra_task_1')
        .step('intra_task_2')

        // The task
        .stage('guided_communication')
        .stage('message_like')
        .stage('secondary_choice')
        .stage('group_choice')

    // Modify the stager to skip one stage.
    // stager.skip('instructions');

    // To skip a step within a stage use:
    // stager.skip('stageName', 'stepName');
    // Notice: here all stages have just one step.
};