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
        .stage('the_scenario')
        .step('the_scenario_4')
        .step('the_scenario_5')
        .step('the_scenario_1')
        .step('the_scenario_2')
        .step('the_scenario_3')

        // .Stage('the_scenario')
        // .step('the_scenario_4')
        // .step('the_scenario_5')
        // .step('the_scenario_1')
        // .step('the_scenario_2')
        // .step('the_scenario_3')

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
};