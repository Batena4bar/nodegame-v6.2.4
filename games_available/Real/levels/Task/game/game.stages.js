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

        // Manipulation screen
        .loopStage('the_scenario', function () {
            console.log('treatment for ' + this.node.nodename, this.settings.CONTROL ? 'control' : this.settings.name);
            if (this.settings.NO_TREATMENTS || this.background_loop_ended) {
                return false;
            }
            this.background_loop_ended = true;
            return true;
        })
        // .stage('the_scenario')
        .step('the_scenario_1')
        .step('the_scenario_2')
        //.step('the_scenario_3')
        .step('intra_task_1')
        .step('intra_task_2')

        // The task
        .loopStage('Year_1', function () {
            // ADD: If using bots, skip this stage
            if (this.settings.NO_TASK || this.task_loop_ended) {
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
        .stage('intra_task')
        .step('intra_task_1')
        .step('intra_task_2')

    // Modify the stager to skip one stage.
    // stager.skip('instructions');

    // To skip a step within a stage use:
    // stager.skip('stageName', 'stepName');
    // Notice: here all stages have just one step.
};